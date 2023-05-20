import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ExperienceRange } from '../references/entities/experience-ranges.entity';
import { EmploymentType } from '../references/entities/employment-types.entity';
import { WorkSchedule } from '../references/entities/work-schedules.entity';
import { Currency } from '../references/entities/currencies.entity';
import { SubjectCategory } from '../references/entities/subject-categories.entity';

export class StoreVacancyDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsObject()
    @IsNotEmpty()
    experienceRange: ExperienceRange;

    @IsObject()
    @IsNotEmpty()
    employmentType: EmploymentType;

    @IsObject()
    @IsNotEmpty()
    workSchedule: WorkSchedule;

    @IsObject()
    @IsNotEmpty()
    subjectCategory: SubjectCategory;

    @IsString()
    @IsOptional()
    responsibility: string;

    @IsString()
    @IsOptional()
    requirement: string;

    @IsString()
    @IsOptional()
    condition: string;

    @IsNumber()
    @IsNotEmpty()
    salary: number;

    @IsObject()
    @IsNotEmpty()
    currency: Currency;
}

export class GetVacanciesQuery{
    @IsOptional()
  fromSalary?: number = null;

  @IsOptional()
  toSalary?: number = null;

  @IsOptional()
  experienceRangeId?: string = null;

  @IsOptional()
  employmentTypeId?: string = null;

  @IsOptional()
  workScheduleId?: string = null;

  @IsOptional()
  subjectCategoryId?: string = null;

  @IsOptional()
  keyword?: string = '';
}