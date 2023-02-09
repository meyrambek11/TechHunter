import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { User } from "../users/users.entity";
import { EducationalInstitutionCategory, EducationalInstitutionCategoryCodes } from "../references/entities/educational-institution-categories.entity";
import { EducationDegree } from "../references/entities/education-degrees.entity";
import { ExperienceRange } from "../references/entities/experience-ranges.entity";
import { TeacherStatus } from "./entities/teacher-statuses.entity";
import { TeacherEducation, TeacherExperience } from "./teachers.type";

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
    experiences?: TeacherExperience[]

    @IsArray()
    @IsOptional()
    educations?: TeacherEducation[]

    @IsString()
    @IsOptional()
    photo?: string;

    @IsString()
    @IsOptional()
    wantedPosition?: string;

    @IsString()
    @IsOptional()
    aboutYourself?: string;

    @IsObject()
    @IsOptional()
    educationalInstitutionCategory?: EducationalInstitutionCategory;

    @IsObject()
    @IsOptional()
    educationDegree?: EducationDegree;

    @IsObject()
    @IsOptional()
    experienceRange?: ExperienceRange;

    @IsObject()
    @IsOptional()
    status?: TeacherStatus;
}