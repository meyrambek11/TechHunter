import { Transform } from 'class-transformer';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { EducationalInstitutionCategory } from '../references/entities/educational-institution-categories.entity';
import { EducationDegree } from '../references/entities/education-degrees.entity';
import { ExperienceRange } from '../references/entities/experience-ranges.entity';
import { TeacherStatus } from './entities/teacher-statuses.entity';
import { TeacherEducation, TeacherExperience } from './teachers.type';
import { Country } from '../references/entities/countries.entity';
import { City } from '../references/entities/cities.entity';
import { Subject } from '../references/entities/subjects.entity';

export class StoreTeacherDto{
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    middleName?: string;

    @Transform(({ value }) => {
    	return new Date(value);
    })
	birthdayDate?: string;

    @IsArray()
    @IsOptional()
    experiences?: TeacherExperience[];

    @IsArray()
    @IsOptional()
    educations?: TeacherEducation[];

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

    @IsObject()
    @IsOptional()
    country?: Country;

    @IsObject()
    @IsOptional()
    city?: City;

    @IsArray()
    @IsOptional()
    subjects?: Subject[];
}

export class TeacherQueryDto{
    @IsOptional()
    @IsString()
    educationalInstitutionCategoryIds: string = null;

    @IsOptional()
    @IsString()
    statusIds: string = null;

    @IsOptional()
    @IsString()
    educationDegreeIds: string = null;

    @IsOptional()
    @IsString()
    experienceRangeIds: string = null;

    @IsOptional()
    @IsString()
    countryIds: string = null;

    @IsOptional()
    @IsString()
    cityIds: string = null;
}