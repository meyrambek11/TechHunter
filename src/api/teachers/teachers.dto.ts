import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "../users/users.entity";

export class StoreTeacherDto{
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    lastName?: string

    @IsString()
    @IsOptional()
    middleName?: string

    @Transform(({ value }) => {
		return new Date(value);
	})
	birthdayDate?: string;

    @IsArray()
    @IsOptional()
    experiences?: object[]

    @IsArray()
    @IsOptional()
    educations?: object[]

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsString()
    @IsOptional()
    photo?: string;

    @IsString()
    @IsOptional()
    wantedPosition?: string;

    @IsString()
    @IsOptional()
    aboutYourself?: string;

    @IsString()
    @IsOptional()
    educationalInstitutionCategoryId?: string;

    @IsString()
    @IsOptional()
    educationDegreeId?: string;

    @IsString()
    @IsOptional()
    experienceRangeId?: string;

    @IsString()
    @IsOptional()
    statusId?: string;
}