import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyCodes } from '../references/entities/currencies.entity';
import { ReferencesService } from '../references/references.service';
import { User } from './users.entity';
import { RolesService } from '../roles/roles.service';
import { RoleCodes } from '../roles/roles.entity';
import { StoreUserDto } from './users.dto';
import { TeachersService } from '../teachers/services/teachers.service';

@Injectable()
export class UsersService{
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private referencesService: ReferencesService,
		private rolesService: RolesService,
		private teachersService: TeachersService
	){}
    
	async store(payload: StoreUserDto): Promise<User>{
		const currency = await this.referencesService.getCurrencyByCode(CurrencyCodes.TENGE);
		const role = await this.rolesService.getRoleByCode(payload.role);

		const user = await this.userRepository.save({
			...payload,
			currency,
			role
		});
		
		await this.defineRole(role.code, user.id);
		return user;
	}

	async getOneByEmail(email: string): Promise<User>{
		return await this.userRepository.findOne({
			where: {email},
			relations: ['role', 'currency']
		})
	}

	async getOne(id: string): Promise<User>{
		return await this.userRepository.findOne({
			where: {id},
			relations: ['role', 'currency']
		})
	}

	async defineRole(role: RoleCodes, userId: string): Promise<{success: boolean}>{
		switch (role) {
			case RoleCodes.TEACHER:
				await this.teachersService.store({
					userId,
				})
				break;
			case RoleCodes.EDUCATIONAL_INSTITUTION:
				//
				break;
			default:
				break;
		}
		return {success: true};
	}
}