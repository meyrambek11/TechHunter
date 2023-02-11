import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserMetadata } from "src/common/types/userMetadata";
import { Repository } from "typeorm";
import { StoreEducationalInstitutionDto } from "./educational-institutions.dto";
import { EducationalInstitution } from "./entities/educational-institutions.entity";

@Injectable()
export class EducationalInstitutionsService{
    constructor(
        @InjectRepository(EducationalInstitution)
        readonly educationalInstitutionsRepository: Repository<EducationalInstitution>
    ){}

    async store(userId: string): Promise<EducationalInstitution>{
        return await this.educationalInstitutionsRepository.save({
            user: {id: userId}
        })
    }

    async getOneByUser(userId: string): Promise<EducationalInstitution>{
        return await  this.educationalInstitutionsRepository.findOne({
            where: {user: {id: userId}},
            relations: ["educationalInstitutionCategory", "country", "city"]
        })
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
}