import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GetAllDocumentsQueryDto, TeacherDocumentStoreDto } from "../teacher-documents.dto";
import { UserMetadata } from "src/common/types/userMetadata";
import { TeachersService } from "src/api/teachers/services/teachers.service";
import { InjectRepository } from "@nestjs/typeorm";
import { TeacherDocument } from "../entities/teacher-documents.entity";
import { Repository, SelectQueryBuilder } from "typeorm";

@Injectable()
export class TeacherDocumentsService{
    constructor(
        @InjectRepository(TeacherDocument)
        private teacherDocumentsRepository: Repository<TeacherDocument>,
        private teachersService: TeachersService
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
        })
    }

    async getOne(id: string, user: UserMetadata){

    }

    async getOneForExternal(id: string, relations: string[]): Promise<TeacherDocument>{
        return await this.teacherDocumentsRepository.findOne({
            where: {id},
            relations
        })
    }

    async getAll(query: GetAllDocumentsQueryDto){
        let documentsQuery = this.teacherDocumentsRepository.createQueryBuilder('document')
			.orderBy('document.created_at', 'ASC')
            .leftJoinAndSelect('document.type', 'type')
			.leftJoinAndSelect('document.category', 'category')
			.leftJoinAndSelect('document.currency', 'currency')
			.leftJoinAndSelect('document.subjects', 'subjects')
			.leftJoinAndSelect('document.language', 'language')
			.leftJoinAndSelect('document.educationalInstitutionCategory', 'educationalInstitutionCategory')
            .leftJoinAndSelect('document.teacher', 'teacher')
            .andWhere('document.saleAccess = :saleAccess', {saleAccess: true})
		
        documentsQuery = this.filteringReceivedData(documentsQuery, query);

        const documents = await documentsQuery.getMany();
		
		return documents.map((d) => {
            return {
                ...d,
                teacher: d.viewProfileAccess ? d.teacher : null
            }
        });
    }

    filteringReceivedData(documentsQuery: SelectQueryBuilder<TeacherDocument>, query: GetAllDocumentsQueryDto): SelectQueryBuilder<TeacherDocument>{
        if(query.subjectIds)
            documentsQuery.andWhere('subjects.id IN (:...subjectIds)', {
                subjectIds: query.subjectIds.split(','),
            });
        return documentsQuery;
    }

}