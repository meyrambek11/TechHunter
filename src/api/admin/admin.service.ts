import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { DataSource, Repository } from 'typeorm';
import { RoleCodes } from '../roles/roles.entity';
import { ReferencesService } from '../references/references.service';
import { ExperienceRange } from '../references/entities/experience-ranges.entity';

@Injectable()
export class AdminService{
	constructor(
        @InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectDataSource() private dataSource: DataSource,
		private referencesService: ReferencesService
	){}

	async increaseBalanceOfAdmin(balance: number): Promise<User>{
		const userAccount = await this.getOne();

		await this.dataSource.transaction(async manager => {
			await manager.save(User, { id: userAccount.id, balance: (userAccount.balance + balance) });
		});
		return userAccount;
	}

	async getOne(): Promise<User>{
		return await this.userRepository.findOne({
			where: {
				role: {
					code: RoleCodes.ADMIN
				}
			}
		});
	}

	async getTeachersPrice(): Promise<ExperienceRange[]>{
		return await this.referencesService.getExperiencesRangeWithPrice();
	}
}