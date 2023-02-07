import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EducationalInstitutionCategory } from "src/api/references/entities/educational-institution-categories.entity";
import { ExperienceRangeCodes } from "src/api/references/entities/experience-ranges.entity";
import { ReferencesService } from "src/api/references/references.service";
import { Repository } from "typeorm";
import { TeacherStatusCodes } from "../entities/teacher-statuses.entity";
import { Teacher } from "../entities/teachers.entity";
import { StoreTeacherDto } from "../teachers.dto";
import { TeacherStatusesService } from "./teacher-statuses.service";

@Injectable()
export class TeachersService{
    constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        private teacherStatusService: TeacherStatusesService,
        private referencesService: ReferencesService
    ){}

    async store(payload: StoreTeacherDto): Promise<Teacher>{
        const status = await this.teacherStatusService.getByCode(TeacherStatusCodes.FREE);
        return await this.teacherRepository.save({
            ...payload,
            user: {id: payload.userId},
            status,
            educationalInstitutionCategory: 
                payload.educationalInstitutionCategoryId 
                ? {id: payload.educationalInstitutionCategoryId} : null,
            educationDegree: payload.educationDegreeId ? {id: payload.educationDegreeId} : null,
            experienceRange: payload.experienceRangeId 
                ? {id: payload.experienceRangeId} 
                : await this.referencesService.getExperienceRangeByCode(ExperienceRangeCodes.WITHOUT_EXPERIENCE)
        })
    }
}