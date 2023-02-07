import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TeacherStatus, TeacherStatusCodes } from "../entities/teacher-statuses.entity";

@Injectable()
export class TeacherStatusesService{
    constructor(
        @InjectRepository(TeacherStatus)
        private teacherStatusRepository: Repository<TeacherStatus>
    ){}

    async getByCode(code: TeacherStatusCodes): Promise<TeacherStatus>{
        return await this.teacherStatusRepository.findOne({
            where: {
                code
            }
        })
    }
}