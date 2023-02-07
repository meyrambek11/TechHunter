import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyCodes } from '../references/entities/currencies.entity';
import { ReferencesService } from '../references/references.service';
import { CreateUserDto } from './users.dto';
import { User } from './users.entity';
import { RolesService } from '../roles/roles.service';
import { RoleCodes } from '../roles/roles.entity';

@Injectable()
export class UsersService{
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private referencesService: ReferencesService,
		private rolesService: RolesService
	){}
    
	async store(payload: CreateUserDto): Promise<User>{
		const currency = await this.referencesService.getOneCurrency(CurrencyCodes.TENGE);
		const role = await this.rolesService.getRoleByCode(payload.role)
		const newUser = await this.userRepository.save({
			...payload,
			currency,
			role
		});
		if(role.code == RoleCodes.TEACHER){
			
		}

		return newUser;
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
}