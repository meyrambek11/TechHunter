import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CurrencyCodes } from '../references/entities/currencies.entity';
import { ReferencesService } from '../references/references.service';
import { User } from './users.entity';
import { RolesService } from '../roles/roles.service';
import { RoleCodes } from '../roles/roles.entity';
import { StoreUserDto, UpdateUserDto } from './users.dto';
import { TeachersService } from '../teachers/services/teachers.service';
import { UserMetadata } from 'src/common/types/userMetadata';
import { Teacher } from '../teachers/entities/teachers.entity';
import { EducationalInstitutionsService } from '../educational-institutions/educational-institutions.service';
import { EducationalInstitution } from '../educational-institutions/entities/educational-institutions.entity';

@Injectable()
export class UsersService{
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private referencesService: ReferencesService,
		private rolesService: RolesService,
		private teachersService: TeachersService,
		private educationalInstitutionsService: EducationalInstitutionsService
	){}
    
	async store(payload: StoreUserDto): Promise<User>{
		const currency = await this.referencesService.getCurrencyByCode(CurrencyCodes.TENGE);
		const role = await this.rolesService.getRoleByCode(payload.role);

		if(role.code == RoleCodes.ADMIN){
			const admin = await this.userRepository.findOne({ where: { role: { code: RoleCodes.ADMIN } } });
			if(admin) throw new HttpException(
				'Админ уже существует',
				HttpStatus.BAD_REQUEST
			  );
		}

		const user = await this.userRepository.save({
			...payload,
			currency,
			role
		});
		
		await this.defineRoleAndStore(role.code, user.id);
		return user;
	}

	async getOneByEmail(email: string): Promise<User>{
		return await this.userRepository.findOne({
			where: { email },
			relations: ['role', 'currency'],
			select: ['id', 'email', 'password', 'phoneNumber', 'balance', 'isBan']
		});
	}

	async getOne(id: string): Promise<User>{
		return await this.userRepository.findOne({
			where: { id },
			relations: ['role', 'currency']
		});
	}

	async defineRoleAndStore(role: RoleCodes, userId: string): Promise<{success: boolean}>{
		switch (role) {
			case RoleCodes.TEACHER:
				await this.teachersService.store(userId);
				break;
			case RoleCodes.EDUCATIONAL_INSTITUTION:
				await this.educationalInstitutionsService.store(userId);
				break;
			default:
				break;
		}
		return { success: true };
	}

	async getAccount(user: UserMetadata): Promise<User & {account: Teacher | EducationalInstitution}>{
		const accountUser = await this.getOne(user.id);
		let account: Teacher | EducationalInstitution = null;
		switch (accountUser.role.code) {
			case RoleCodes.TEACHER:
				account = await this.teachersService.getOneByUser(user.id);
				break;
			case RoleCodes.EDUCATIONAL_INSTITUTION:
				account = await this.educationalInstitutionsService.getOneByUser(user.id);
				break;
			default:
				break;
		}
		return { ...accountUser, account };
	}

	async update(user: UserMetadata, payload: UpdateUserDto): Promise<User>{
		if(payload.email){
			const userWithNewEmail = await this.userRepository.findOne({
				where: {
					id: Not(user.id),
					email: payload.email
				}
			});

			if(userWithNewEmail) throw new HttpException(
				'Пользователь с таким email уже существует',
				HttpStatus.BAD_REQUEST
			  );
		}
		await this.userRepository.update(user.id, { ...payload });
		return this.getAccount(user);
	}

	async topUpBalance(user: UserMetadata, balance: number): Promise<User>{
		await this.userRepository.createQueryBuilder()
			.update(User)
			.set({ balance: () => `balance + ${balance}` })
			.execute();
		return this.getOne(user.id);
	}
}