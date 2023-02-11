import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserMetadata } from "src/common/types/userMetadata";
import { Repository, SelectQueryBuilder } from "typeorm";
import { EducationalInstitutionQueryDto, StoreEducationalInstitutionDto } from "../educational-institutions.dto";
import { EducationalInstitution } from "../entities/educational-institutions.entity";

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

    async getAll(query: EducationalInstitutionQueryDto): Promise<EducationalInstitution[]>{
        let educationalInstitutionsQuery = this.educationalInstitutionsRepository.createQueryBuilder('educationInstitution')
			.orderBy('educationInstitution.created_at', 'ASC')
			.leftJoinAndSelect('educationInstitution.educationalInstitutionCategory', 'educationalInstitutionCategory')
			.leftJoinAndSelect('educationInstitution.country', 'country')
			.leftJoinAndSelect('educationInstitution.city', 'city')
		
        educationalInstitutionsQuery = this.filteringReceivedData(educationalInstitutionsQuery, query);
        return educationalInstitutionsQuery.getMany();
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

    filteringReceivedData(
        educationalInstitutionsQuery: SelectQueryBuilder<EducationalInstitution>, 
        query: EducationalInstitutionQueryDto
    ): SelectQueryBuilder<EducationalInstitution> {

        if(query.educationalInstitutionCategoryIds)
            educationalInstitutionsQuery.andWhere('educationalInstitutionCategory.id IN (:...educationalInstitutionCategoryIds)', {
                educationalInstitutionCategoryIds: query.educationalInstitutionCategoryIds.split(','),
            });
        
        if(query.countryIds)
            educationalInstitutionsQuery.andWhere('country.id IN (:...countryIds)', {
		    	countryIds: query.countryIds.split(','),
		    });

		if(query.cityIds)
            educationalInstitutionsQuery.andWhere('city.id IN (:...cityIds)', {
				cityIds: query.cityIds.split(','),
			});

        return educationalInstitutionsQuery;
    }
}