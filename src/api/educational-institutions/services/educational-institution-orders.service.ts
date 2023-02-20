import { Injectable } from '@nestjs/common/decorators';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { EducationalInstitutionOrder } from '../entities/educational-institution-orders.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class EducationalInstitutionOrdersService{
	constructor(
        @InjectRepository(EducationalInstitutionOrder)
        readonly educationalInstitutionOrderRepository: Repository<EducationalInstitutionOrder>,
		@InjectDataSource() private dataSource: DataSource,
	){}

	async getOneByTeacherAndEducationInstitution(teacherId: string, userId: string): Promise<EducationalInstitutionOrder>{
		return await this.educationalInstitutionOrderRepository.findOne({
			where: {
				teacher: { id: teacherId },
				educationalInstitution: {
					user: { id: userId }
				}
			}
		});
	}

	async store(payload: Partial<EducationalInstitutionOrder>): Promise<{success: boolean}>{
		await this.dataSource.transaction(async manager => {
			await manager.save(EducationalInstitutionOrder, {
				price: payload.price,
				currency: payload.currency,
				teacher: payload.teacher,
				educationalInstitution: payload.educationalInstitution
			});
		});
		return {success: true};
	}
    
	async getByEducationalInstitution(educationalInstitutionId: string): Promise<EducationalInstitutionOrder[]>{
		return await this.educationalInstitutionOrderRepository.find({
			where: {
				educationalInstitution: { id: educationalInstitutionId }
			},
			relations: ['teacher']
		});
	}
}