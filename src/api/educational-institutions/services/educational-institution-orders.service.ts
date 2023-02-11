import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { EducationalInstitutionOrder } from "../entities/educational-institution-orders.entity";
import { Repository } from "typeorm";

@Injectable()
export class EducationalInstitutionOrdersService{
    constructor(
        @InjectRepository(EducationalInstitutionOrder)
        readonly educationalInstitutionOrderRepository: Repository<EducationalInstitutionOrder>
    ){}

    async getOneByTeacherAndEducationInstitution(teacherId: string, userId: string): Promise<EducationalInstitutionOrder>{
        return await this.educationalInstitutionOrderRepository.findOne({
            where: {
                teacher: {id: teacherId},
                educationalInstitution: {
                    user: {id: userId}
                }
            }
        })
    }
}