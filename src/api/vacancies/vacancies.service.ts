import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetVacanciesQuery, StoreVacancyDto } from './vacancies.dto';
import { UserMetadata } from 'src/common/types/userMetadata';
import { EducationalInstitutionsService } from '../educational-institutions/services/educational-institutions.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacancy } from './vacancies.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class VacancyService{
	constructor(
        private educationalInstitutionService: EducationalInstitutionsService,
        @InjectRepository(Vacancy)
        private vacancyRepository: Repository<Vacancy>
	){}

	async store(user: UserMetadata, payload: StoreVacancyDto): Promise<Vacancy>{
		const educationalInstitution = await this.educationalInstitutionService.getOneByUser(user.id);

		console.log(educationalInstitution);

		if(!educationalInstitution)
			throw new HttpException(
				`Educational institution with user id: ${user.id} does not exist`,
				HttpStatus.BAD_REQUEST
			);

		return await this.vacancyRepository.save({
			educationalInstitution: { id: educationalInstitution.id },
			...payload,
		}); 
	}

	async getAll(query: GetVacanciesQuery): Promise<Vacancy[]>{
		let vacancyQuery = this.vacancyRepository.createQueryBuilder('vacancy')
			.orderBy('vacancy.created_at', 'ASC')
			.leftJoinAndSelect('vacancy.educationalInstitution', 'educationalInstitution')
			.leftJoinAndSelect('vacancy.experienceRange', 'experienceRange')
			.leftJoinAndSelect('vacancy.employmentType', 'employmentType')
			.leftJoinAndSelect('vacancy.workSchedule', 'workSchedule')
			.leftJoinAndSelect('vacancy.currency', 'currency')
			.leftJoinAndSelect('vacancy.subjectCategory', 'subjectCategory')
			.where('vacancy.isActive =:status', { status: true });
		
		vacancyQuery = this.filteringReceivedData(vacancyQuery, query);
		return vacancyQuery.getMany();
	}

	async notActivate(user: UserMetadata, id: string): Promise<{success: boolean}>{
		const educationalInstitution = await this.educationalInstitutionService.getOneByUser(user.id);
		if(!educationalInstitution) return { success: false };

		const vacancy = await this.vacancyRepository.findOne({ where: { id, educationalInstitution: { id: educationalInstitution.id } } });
		if(!vacancy) return { success: false };

		await this.vacancyRepository.update(vacancy.id, { isActive: false });

		return { success: true };
	}

	filteringReceivedData(
		vacancyQuery: SelectQueryBuilder<Vacancy>,
		query: GetVacanciesQuery,
	): SelectQueryBuilder<Vacancy> {

		if (query.fromSalary)
			vacancyQuery.andWhere('task.salary >= :from', { from: query.fromSalary });
    
		if (query.toSalary)
			vacancyQuery.andWhere('task.salary <= :to', { to: query.toSalary });
    
		if (query.employmentTypeId)
			vacancyQuery.andWhere('employmentType.id = :employmentTypeId', {
				employmentTypeId: query.employmentTypeId,
			});
    
		if (query.experienceRangeId)
			vacancyQuery.andWhere('experienceRange.id = :experienceRangeId', {
				experienceRangeId: query.experienceRangeId,
			});
        
		if(query.subjectCategoryId)
			vacancyQuery.andWhere('subjectCategory.id = :subjectCategoryId', {
				subjectCategoryId: query.subjectCategoryId,
			});
        
		if(query.workScheduleId)
			vacancyQuery.andWhere('workSchedule.id = :workScheduleId', {
				workScheduleId: query.workScheduleId,
			});
    
		return vacancyQuery;
	}
}