import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserMetadata } from 'src/common/types/userMetadata';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { EducationalInstitutionQueryDto, StoreEducationalInstitutionDto } from '../educational-institutions.dto';
import { EducationalInstitution } from '../entities/educational-institutions.entity';
import { TeachersService } from 'src/api/teachers/services/teachers.service';
import { ReferencesService } from 'src/api/references/references.service';
import { BuyingLogicClass } from 'src/api/buying.logic';
import { UsersService } from 'src/api/users/users.service';
import { EducationalInstitutionOrdersService } from './educational-institution-orders.service';
import { EducationalInstitutionOrder } from '../entities/educational-institution-orders.entity';
import { AdminService } from 'src/api/admin/admin.service';

@Injectable()
export class EducationalInstitutionsService{
	constructor(
        @InjectRepository(EducationalInstitution)
        readonly educationalInstitutionsRepository: Repository<EducationalInstitution>,
        @Inject(forwardRef(() => TeachersService))
        private teachersService: TeachersService,
        private referencesService: ReferencesService,
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService,
        private educationalInstitutionOrdersService: EducationalInstitutionOrdersService,
        @InjectDataSource() private dataSource: DataSource,
        private adminService: AdminService,
	){}

	async store(userId: string): Promise<EducationalInstitution>{
		return await this.educationalInstitutionsRepository.save({
			user: { id: userId }
		});
	}

	async getOne(id: string): Promise<EducationalInstitution>{
		return await this.educationalInstitutionsRepository.findOne({
			where: { id },
			relations: ['user', 'educationalInstitutionCategory', 'country', 'city']
		});
	}

	async getOneByUser(userId: string): Promise<EducationalInstitution>{
		return await  this.educationalInstitutionsRepository.findOne({
			where: { user: { id: userId } },
			relations: ['educationalInstitutionCategory', 'country', 'city']
		});
	}

	async getAll(query: EducationalInstitutionQueryDto): Promise<EducationalInstitution[]>{
		let educationalInstitutionsQuery = this.educationalInstitutionsRepository.createQueryBuilder('educationInstitution')
			.orderBy('educationInstitution.created_at', 'ASC')
			.leftJoinAndSelect('educationInstitution.educationalInstitutionCategory', 'educationalInstitutionCategory')
			.leftJoinAndSelect('educationInstitution.country', 'country')
			.leftJoinAndSelect('educationInstitution.city', 'city');
		
		educationalInstitutionsQuery = this.filteringReceivedData(educationalInstitutionsQuery, query);
		return educationalInstitutionsQuery.getMany();
	}

	async update(user: UserMetadata, payload: StoreEducationalInstitutionDto): Promise<EducationalInstitution>{
		const educationalInstitution = await this.educationalInstitutionsRepository.findOneBy({ user: { id: user.id } });
		if(!educationalInstitution)
			throw new HttpException(
				`Educational institution with user id: ${user.id} does not exist in stock`,
				HttpStatus.BAD_REQUEST
			);
		await this.educationalInstitutionsRepository.update(educationalInstitution.id, {
			...payload
		});
        
		return this.getOneByUser(user.id);
	}

	async buyTeacher(user: UserMetadata, teacherId: string): Promise<{success: boolean}>{
		const educationalInstitution = await this.getOneByUser(user.id);
		if(!educationalInstitution)
			throw new HttpException(
				`Educational institution with user id: ${user.id} does not exist`,
				HttpStatus.BAD_REQUEST
			);

		const teacher = await this.teachersService.getOneForExternal(teacherId, ['experienceRange']);
		if(!teacher)
			throw new HttpException(
				`Teacher with user id: ${user.id} does not exist`,
				HttpStatus.BAD_REQUEST
			);
        
		if((await this.educationalInstitutionOrdersService.getOneByTeacherAndEducationInstitution(teacher.id, user.id))) return { success: true };

		const experienceRange = await this.referencesService.getExperienceRangeWithPrice(teacher.experienceRange.code);
		const costumer = await this.usersService.getOne(user.id);

		console.log(`Educational institution with name: ${educationalInstitution.name} want to buy teacher with id: ${teacher.id}`);
		if(!((new BuyingLogicClass()).checkHasUserEnoughMoney(costumer, experienceRange.price, experienceRange.currency))) return { success: false };

		await this.educationalInstitutionOrdersService.store({
			teacher,
			educationalInstitution,
			price: experienceRange.price,
			currency: experienceRange.currency
		})
		await this.usersService.decreaseBalance(user, experienceRange.price);
		await this.adminService.increaseBalanceOfAdmin(experienceRange.price);
		
		console.log(`Educational institution with name: ${educationalInstitution.name} buy teacher with id: ${teacher.id} for price: ${experienceRange.price}`);

		return { success: true };
	}

	async getBoughtTeachers(user: UserMetadata): Promise<EducationalInstitutionOrder[]>{
		const educationalInstitution = await this.getOneByUser(user.id);
		if(!educationalInstitution)
			throw new HttpException(
				`Educational institution with user id: ${user.id} does not exist in stock`,
				HttpStatus.BAD_REQUEST
			);
		return await this.educationalInstitutionOrdersService.getByEducationalInstitution(educationalInstitution.id);
	}

	filteringReceivedData(
		educationalInstitutionsQuery: SelectQueryBuilder<EducationalInstitution>, 
		query: EducationalInstitutionQueryDto
	): SelectQueryBuilder<EducationalInstitution> {

		if(query.educationalInstitutionCategoryIds)
			educationalInstitutionsQuery.andWhere('educationalInstitutionCategory.id IN (:...educationalInstitutionCategoryIds)', {
				educationalInstitutionCategoryIds: query.educationalInstitutionCategoryIds.split(','),
			});
        
		if(query.countryIds)
			educationalInstitutionsQuery.andWhere('country.id IN (:...countryIds)', {
		    	countryIds: query.countryIds.split(','),
		    });

		if(query.cityIds)
			educationalInstitutionsQuery.andWhere('city.id IN (:...cityIds)', {
				cityIds: query.cityIds.split(','),
			});

		return educationalInstitutionsQuery;
	}
}