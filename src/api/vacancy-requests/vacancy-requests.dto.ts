import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { Vacancy } from '../vacancies/vacancies.entity';

export class ResponseDto{
    @IsObject()
    @IsNotEmpty()
    vacancy: Vacancy;

    @IsString()
    @IsOptional()
    letter: string;
}