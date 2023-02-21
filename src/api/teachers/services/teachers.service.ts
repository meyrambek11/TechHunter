import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperienceRangeCodes } from 'src/api/references/entities/experience-ranges.entity';
import { ReferencesService } from 'src/api/references/references.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TeacherStatusCodes } from '../entities/teacher-statuses.entity';
import { Teacher } from '../entities/teachers.entity';
import { StoreTeacherDto, TeacherQueryDto } from '../teachers.dto';
import { TeacherStatusesService } from './teacher-statuses.service';
import { UserMetadata } from 'src/common/types/userMetadata';
import { EducationalInstitutionOrdersService } from 'src/api/educational-institutions/services/educational-institution-orders.service';
import { User } from 'src/api/users/users.entity';

@Injectable()
export class TeachersService{
	constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        private teacherStatusService: TeacherStatusesService,
        private referencesService: ReferencesService,
		@Inject(forwardRef(() => EducationalInstitutionOrdersService))
		private educationalInstitutionOrderService: EducationalInstitutionOrdersService
	){}

	async store(userId: string): Promise<Teacher>{
		const status = await this.teacherStatusService.getByCode(TeacherStatusCodes.FREE);
		return await this.teacherRepository.save({
			user: { id: userId },
			status,
			experienceRange: await this.referencesService.getExperienceRangeByCode(ExperienceRangeCodes.WITHOUT_EXPERIENCE)
		});
	}

	async getOneByUser(userId: string): Promise<Teacher>{
		return await this.teacherRepository.findOne({
			where: { user: { id: userId } },
			relations: ['educationalInstitutionCategory', 'status', 'educationDegree', 'experienceRange', 'country', 'city', 'subjects']
		});
	}

	async getAll(query: TeacherQueryDto): Promise<Teacher[]>{
		let teachersQuery = this.teacherRepository.createQueryBuilder('teacher')
			.orderBy('teacher.created_at', 'ASC')
			.leftJoinAndSelect('teacher.status', 'status')
			.leftJoinAndSelect('teacher.educationalInstitutionCategory', 'educationalInstitutionCategory')
			.leftJoinAndSelect('teacher.experienceRange', 'experienceRange')
			.leftJoinAndSelect('teacher.educationDegree', 'educationDegree')
			.leftJoinAndSelect('teacher.country', 'country')
			.leftJoinAndSelect('teacher.city', 'city');
		
		teachersQuery = this.filteringReceivedData(teachersQuery, query);
		
		return await teachersQuery.getMany();
	}

	async getOne(id: string, user: UserMetadata): Promise<Teacher & {info: Partial<Teacher>}>{
		const teacher = await this.teacherRepository.findOne({
			where: { id },
			relations: ['educationalInstitutionCategory', 'status', 'educationDegree', 'experienceRange', 'country', 'city', 'subjects', 'user']
		});

		if(!teacher)
			throw new HttpException(
				`Teacher with user id: ${user.id} does not exist`,
				HttpStatus.BAD_REQUEST
			);

		const info: Partial<User> = {
			email: teacher.user.email,
			phoneNumber: teacher.user.phoneNumber
		};
		delete teacher.user;
		
		const order = await this.educationalInstitutionOrderService.getOneByTeacherAndEducationInstitution(id, user.id);

		if(!order) 
			return {
				...teacher,
				info: null
			};
		
		return {
			...teacher,
			info
		};
		
	}

	async getOneForExternal(id: string): Promise<Teacher>{
		return await this.teacherRepository.findOne({
			where: { id },
			relations: ['experienceRange']
		});
	}

	async update(user: UserMetadata, payload: StoreTeacherDto): Promise<Teacher>{
		const teacher = await this.teacherRepository.findOneBy({ user: { id: user.id } });
		if(!teacher)
			throw new HttpException(
				`Teacher with user id: ${user.id} does not exist`,
				HttpStatus.BAD_REQUEST
			);
		await this.teacherRepository.save({
			id: teacher.id,
			...payload
		});
		return this.getOneByUser(user.id);
	}

	filteringReceivedData(
		teachersQuery: SelectQueryBuilder<Teacher>, 
		query: TeacherQueryDto
	): SelectQueryBuilder<Teacher>{

		if(query.educationalInstitutionCategoryIds)
			teachersQuery.andWhere('educationalInstitutionCategory.id IN (:...educationalInstitutionCategoryIds)', {
				educationalInstitutionCategoryIds: query.educationalInstitutionCategoryIds.split(','),
			});

		if(query.statusIds)
			teachersQuery.andWhere('status.id IN (:...statusIds)', {
				statusIds: query.statusIds.split(','),
			});

		if(query.educationDegreeIds)
			teachersQuery.andWhere('educationDegree.id IN (:...educationDegreeIds)', {
				educationDegreeIds: query.educationDegreeIds.split(','),
			});

		if(query.experienceRangeIds)
			teachersQuery.andWhere('experienceRange.id IN (:...experienceRangeIds)', {
				experienceRangeIds: query.experienceRangeIds.split(','),
			});

		if(query.countryIds)
			teachersQuery.andWhere('country.id IN (:...countryIds)', {
				countryIds: query.countryIds.split(','),
			});

		if(query.cityIds)
			teachersQuery.andWhere('city.id IN (:...cityIds)', {
				cityIds: query.cityIds.split(','),
			});

		return teachersQuery;
	}
}