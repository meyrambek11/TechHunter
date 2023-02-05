import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyCodes } from '../references/entities/currencies.entity';
import { ReferencesService } from '../references/references.service';
import { CreateUserDto } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService{
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private referencesService: ReferencesService
	){}
    
	async store(payload: CreateUserDto): Promise<User>{
		const currency = await this.referencesService.getOneCurrency(CurrencyCodes.TENGE);
		return await this.userRepository.save({
			...payload,
			currency,
			role: {id: payload.role_id}
		});
	}

	async getOneByEmail(email: string): Promise<User>{
		return await this.userRepository.findOne({
			where: {email},
			select: ['id', 'email', 'is_ban', 'phone_number', 'balance','currency', 'password'],
			relations: ['role', 'currency']
		})
	}

	async getOne(id: string): Promise<User>{
		console.log(id)
		return await this.userRepository.findOne({
			where: {id},
			relations: ['role', 'currency']
		})
	}
}