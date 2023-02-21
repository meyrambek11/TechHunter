import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TeacherDocumentStoreDto } from "../teacher-documents.dto";
import { UserMetadata } from "src/common/types/userMetadata";
import { TeachersService } from "src/api/teachers/services/teachers.service";
import { InjectRepository } from "@nestjs/typeorm";
import { TeacherDocument } from "../entities/teacher-documents.entity";
import { Repository } from "typeorm";

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
}