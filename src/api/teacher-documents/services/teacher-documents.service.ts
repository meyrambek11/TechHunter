import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetAllDocumentsQueryDto, TeacherDocumentStoreDto } from '../teacher-documents.dto';
import { UserMetadata } from 'src/common/types/userMetadata';
import { TeachersService } from 'src/api/teachers/services/teachers.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherDocument } from '../entities/teacher-documents.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { DocumentOrdersService } from './document-orders.service';

@Injectable()
export class TeacherDocumentsService{
	constructor(
        @InjectRepository(TeacherDocument)
        private teacherDocumentsRepository: Repository<TeacherDocument>,
        private teachersService: TeachersService,
        private documentOrdersService: DocumentOrdersService
	) {}

	async store(payload: TeacherDocumentStoreDto, user: UserMetadata): Promise<TeacherDocument>{
		const teacher = await this.teachersService.getOneByUser(user.id);
		if(!teacher)
			throw new HttpException(
				`Teacher with user id: ${user.id} does not exist`,
				HttpStatus.BAD_REQUEST
			);
		return await this.teacherDocumentsRepository.save({
			...payload,
			teacher
		});
	}

	async getOne(id: string, user: UserMetadata): Promise<TeacherDocument>{
		const order = await this.documentOrdersService.getOneByUserAndDocument(user.id, id);
		const document = await this.teacherDocumentsRepository.findOne({
			where: { id },
			select: ['id', 'name', 'description', 'price', 'saleAccess', 'viewProfileAccess', 'url', 'created_at'],
			relations: ['currency', 'language', 'educationalInstitutionCategory', 'type', 'category', 'subjects', 'teacher', 'teacher.user']
		});

		if(!document)
			throw new HttpException(
				`Document with id: ${id} does not exist`,
				HttpStatus.BAD_REQUEST
			);


		if(!order && (user.id != document.teacher.user.id)) document.url = null;
		delete document.teacher.user;
		if(!(document.viewProfileAccess)) document.teacher = null;

		return document;
	}

	async getOneForExternal(id: string, relations: string[]): Promise<TeacherDocument>{
		return await this.teacherDocumentsRepository.findOne({
			where: { id },
			relations
		});
	}

	async getAll(query: GetAllDocumentsQueryDto): Promise<TeacherDocument[]>{
		let documentsQuery = this.teacherDocumentsRepository.createQueryBuilder('document')
			.orderBy('document.created_at', 'ASC')
			.leftJoinAndSelect('document.type', 'type')
			.leftJoinAndSelect('document.category', 'category')
			.leftJoinAndSelect('document.currency', 'currency')
			.leftJoinAndSelect('document.subjects', 'subjects')
			.leftJoinAndSelect('document.language', 'language')
			.leftJoinAndSelect('document.educationalInstitutionCategory', 'educationalInstitutionCategory')
			.andWhere('document.saleAccess = :saleAccess', { saleAccess: true });
		
		documentsQuery = this.filteringReceivedData(documentsQuery, query);
		
		return await documentsQuery.getMany();
	}

	filteringReceivedData(documentsQuery: SelectQueryBuilder<TeacherDocument>, query: GetAllDocumentsQueryDto): SelectQueryBuilder<TeacherDocument>{
		if(query.subjectIds)
			documentsQuery.andWhere('subjects.id IN (:...subjectIds)', {
				subjectIds: query.subjectIds.split(','),
			});
        
		if(query.categoryIds)
			documentsQuery.andWhere('category.id IN (:...categoryIds)', {
				categoryIds: query.categoryIds.split(','),
			});

		if(query.educationalInstitutionCategoryIds)
			documentsQuery.andWhere('educationalInstitutionCategory.id IN (:...educationalInstitutionCategoryIds)', {
				educationalInstitutionCategoryIds: query.educationalInstitutionCategoryIds.split(','),
			});

		if(query.languageIds)
			documentsQuery.andWhere('language.id IN (:...languageIds)', {
				languageIds: query.languageIds.split(','),
			});
        
		if(query.typeIds)
			documentsQuery.andWhere('type.id IN (:...typeIds)', {
				typeIds: query.typeIds.split(','),
			});
        
		return documentsQuery;
	}

	async getOwnUploadedDocumentsAsTeacher(user: UserMetadata): Promise<TeacherDocument[]>{
		const teacher = await this.teachersService.getOneByUser(user.id);
		if(!teacher)
			throw new HttpException(
				`Teacher with user id: ${user.id} does not exist`,
				HttpStatus.BAD_REQUEST
			);
        
		return await this.teacherDocumentsRepository.find({
			where: { teacher: { id: teacher.id } },
			relations: ['currency', 'language', 'educationalInstitutionCategory', 'type', 'category', 'subjects']
		});
	}

}