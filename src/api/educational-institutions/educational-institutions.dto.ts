import { IsObject, IsOptional, IsString } from "class-validator";
import { City } from "../references/entities/cities.entity";
import { Country } from "../references/entities/countries.entity";
import { EducationalInstitutionCategory } from "../references/entities/educational-institution-categories.entity";

export class StoreEducationalInstitutionDto{
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    aboutYourself: string;

    @IsOptional()
    @IsObject()
    educationalInstitutionCategory: EducationalInstitutionCategory;

    @IsOptional()
    @IsObject()
    country: Country;

    @IsOptional()
    @IsObject()
    city: City
}