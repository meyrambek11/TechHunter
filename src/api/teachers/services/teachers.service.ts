import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EducationalInstitutionCategory } from "src/api/references/entities/educational-institution-categories.entity";
import { ExperienceRangeCodes } from "src/api/references/entities/experience-ranges.entity";
import { ReferencesService } from "src/api/references/references.service";
import { Repository } from "typeorm";
import { TeacherStatusCodes } from "../entities/teacher-statuses.entity";
import { Teacher } from "../entities/teachers.entity";
import { StoreTeacherDto } from "../teachers.dto";
import { TeacherStatusesService } from "./teacher-statuses.service";
import { User } from "src/api/users/users.entity";
import { UserMetadata } from "src/common/types/userMetadata";

@Injectable()
export class TeachersService{
    constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        private teacherStatusService: TeacherStatusesService,
        private referencesService: ReferencesService
    ){}

    async store(userId: string, payload?: StoreTeacherDto): Promise<Teacher>{
        const status = await this.teacherStatusService.getByCode(TeacherStatusCodes.FREE);
        return await this.teacherRepository.save({
            user: {id: userId},
            status,
            experienceRange: await this.referencesService.getExperienceRangeByCode(ExperienceRangeCodes.WITHOUT_EXPERIENCE)
        })
    }

    async getOneByUser(userId: string): Promise<Teacher>{
        return await this.teacherRepository.findOne({
            where: {user: {id: userId}},
            relations: ['educationalInstitutionCategory', 'status', 'educationDegree', 'experienceRange']
        })
    }

    async update(user: UserMetadata, payload: StoreTeacherDto): Promise<Teacher>{
        const teacher = await this.teacherRepository.findOneBy({user: {id: user.id}})
        if(!teacher)
            throw new HttpException(
                `Teacher with user id: ${user.id} does not exist in stock`,
                HttpStatus.BAD_REQUEST
            );
        await this.teacherRepository.update(teacher.id, {
            ...payload
        })
        return this.getOneByUser(user.id);
    }
}