import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, isArray } from "class-validator";
import { ExperienceRange } from "../references/entities/experience-ranges.entity";
import { EmploymentType } from "../references/entities/employment-types.entity";
import { WorkSchedule } from "../references/entities/work-schedules.entity";
import { Currency } from "../references/entities/currencies.entity";
import { Subject } from "../references/entities/subjects.entity";

export class StoreVacancyDto{
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsArray()
    @IsOptional()
    subjects: Subject[];

    @IsObject()
    @IsOptional()
    experienceRange: ExperienceRange;

    @IsObject()
    @IsOptional()
    employmentType: EmploymentType;

    @IsObject()
    @IsOptional()
    workSchedule: WorkSchedule;

    @IsArray()
    @IsOptional()
    responsibilities: string[];

    @IsArray()
    @IsOptional()
    requirements: string[];

    @IsArray()
    @IsOptional()
    conditions: string[];

    @IsNumber()
    @IsNotEmpty()
    salary: number;

    @IsObject()
    @IsNotEmpty()
    currency: Currency;
}