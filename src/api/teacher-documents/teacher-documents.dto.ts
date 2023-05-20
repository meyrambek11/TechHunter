import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { EducationalInstitutionCategory } from '../references/entities/educational-institution-categories.entity';
import { Subject } from '../references/entities/subjects.entity';
import { Currency } from '../references/entities/currencies.entity';
import { Language } from '../references/entities/languages.entity';
import { DocumentType } from './entities/document-types.entity';
import { DocumentCategory } from './entities/document-categories.entity';

export class TeacherDocumentStoreDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsObject()
    @IsOptional()
    educationalInstitutionCategory?: EducationalInstitutionCategory;

    @IsArray()
    @IsOptional()
    subjects?: Subject[];

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsObject()
    @IsNotEmpty()
    currency: Currency;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsBoolean()
    @IsOptional()
    saleAccess: boolean;

    @IsBoolean()
    @IsOptional()
    viewProfileAccess: boolean;

    @IsObject()
    @IsOptional()
    language?: Language;

    @IsObject()
    @IsOptional()
    type?: DocumentType;

    @IsObject()
    @IsOptional()
    category?: DocumentCategory;
}


export class GetAllDocumentsQueryDto{
    @IsOptional()
    @IsString()
    educationalInstitutionCategoryIds: string = null;

    @IsOptional()
    @IsString()
    typeIds: string = null;

    @IsOptional()
    @IsString()
    categoryIds: string = null;

    @IsOptional()
    @IsString()
    languageIds: string = null;

    @IsOptional()
    @IsString()
    subjectIds: string = null;
}