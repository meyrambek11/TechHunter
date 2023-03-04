import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { StoreVacancyDto } from "./vacancies.dto";
import { UserMetadata } from "src/common/types/userMetadata";
import { EducationalInstitutionsService } from "../educational-institutions/services/educational-institutions.service";

@Injectable()
export class VacancyService{
    constructor(
        private educationalInstitutionService: EducationalInstitutionsService
    ){}

    async store(user: UserMetadata, payload: StoreVacancyDto){
        const educationalInstitution = await this.educationalInstitutionService.getOneByUser(user.id);

        if(!educationalInstitution)
            throw new HttpException(
                `Educational institution with user id: ${user.id} does not exist in stock`,
                HttpStatus.BAD_REQUEST
            );
        
        
    }
}