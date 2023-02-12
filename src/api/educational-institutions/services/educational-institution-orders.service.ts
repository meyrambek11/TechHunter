import { Inject, Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { EducationalInstitutionOrder } from "../entities/educational-institution-orders.entity";
import { Repository } from "typeorm";
import { UserMetadata } from "src/common/types/userMetadata";
import { EducationalInstitutionsService } from "./educational-institutions.service";
import { forwardRef, HttpException, HttpStatus } from "@nestjs/common";
import { TeachersService } from "src/api/teachers/services/teachers.service";
import { ReferencesService } from "src/api/references/references.service";
import { BuyingLogicClass } from "src/api/buying.logic";
import { UsersService } from "src/api/users/users.service";

@Injectable()
export class EducationalInstitutionOrdersService{
    constructor(
        @InjectRepository(EducationalInstitutionOrder)
        readonly educationalInstitutionOrderRepository: Repository<EducationalInstitutionOrder>,
        private educationalInstitutionsService: EducationalInstitutionsService,
        @Inject(forwardRef(() => TeachersService))
        private teachersService: TeachersService,
        private referencesService: ReferencesService,
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService
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

    async store(user: UserMetadata, teacherId: string): Promise<{success: boolean}>{
        const educationalInstitution = await this.educationalInstitutionsService.getOneByUser(user.id);
        if(!educationalInstitution)
            throw new HttpException(
                `Educational institution with user id: ${user.id} does not exist in stock`,
                HttpStatus.BAD_REQUEST
            );

        const teacher = await this.teachersService.getOneForExternal(teacherId);
        if(!teacher)
            throw new HttpException(
                `Teacher with user id: ${user.id} does not exist in stock`,
                HttpStatus.BAD_REQUEST
            );
        
        const experienceRange = await this.referencesService.getExperienceRangeWithPrice(teacher.experienceRange.code);

        if(!((new BuyingLogicClass()).checkHasUserEnoughMoney(user, experienceRange.price))) return {success: false};

        await this.educationalInstitutionOrderRepository.save({
            price: experienceRange.price,
            currency: experienceRange.currency,
            educationalInstitution,
            teacher
        })

        await this.usersService.decreaseBalance(user, experienceRange.price);
        await this.usersService.increaseBalanceOfAdmin(experienceRange.price);

        return {success: true};
    }
}