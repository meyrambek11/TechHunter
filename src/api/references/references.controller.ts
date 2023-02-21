import { Controller, Get, Param, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { GetAllQueryDto } from 'src/common/get-all.dto';
import { City } from './entities/cities.entity';
import { Country } from './entities/countries.entity';
import { Currency } from './entities/currencies.entity';
import { EducationDegree } from './entities/education-degrees.entity';
import { EducationalInstitutionCategory } from './entities/educational-institution-categories.entity';
import { EducationalInstitutionList } from './entities/educational-institutions-list.entity';
import { EmploymentType } from './entities/employment-types.entity';
import { Language } from './entities/languages.entity';
import { SubjectCategory } from './entities/subject-categories.entity';
import { Subject } from './entities/subjects.entity';
import { ReferencesService } from './references.service';
import { WorkSchedule } from './entities/work-schedules.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { ExperienceRange } from './entities/experience-ranges.entity';
import { DocumentType } from '../teacher-documents/entities/document-types.entity';
import { DocumentCategory } from '../teacher-documents/entities/document-categories.entity';

@UseGuards(JwtAuthGuard)
@Controller('references')
export class ReferencesController{
	constructor(private readonly referencesService: ReferencesService){}

    @Get('countries')
	getAllCountries(): Promise<Country[]>{
		return this.referencesService.getAllCountries();
	}

    @Get('cities/:country_id')
    getCitiesByCountry(
        @Param('country_id', ParseUUIDPipe) countryId: string, 
        @Query() query: GetAllQueryDto
    ): Promise<City[]>{
    	return this.referencesService.getCitiesByCountry(countryId, query);
    }

    @Get('languages')
    getAllLanguages(): Promise<Language[]>{
    	return this.referencesService.getAllLanguages();
    }

    @Get('currencies')
    getAllCurrencies(): Promise<Currency[]>{
    	return this.referencesService.getAllCurrencies();
    }

    @Get('education-degrees')
    getAllEducationDegrees(): Promise<EducationDegree[]>{
    	return this.referencesService.getAllEducationDegrees();
    }

    @Get('educational-institution-categories')
    getAllEducationalInstitutionCategories(): Promise<EducationalInstitutionCategory[]>{
    	return this.referencesService.getAllEducationalInstitutionCategories();
    }

    @Get('educational-institutions-list/:category_id')
    getEducationalInstitutionListByCategory(
        @Param('category_id', ParseUUIDPipe) categoryId: string, 
        @Query() query: GetAllQueryDto
    ): Promise<EducationalInstitutionList[]>{
    	return this.referencesService.getEducationalInstitutionListByCategory(categoryId, query);
    }

    @Get('subject-categories/:educational_institution_category_id')
    getSubjectCategoriesByEducationInstitutionCategory(@Param('educational_institution_category_id', ParseUUIDPipe) categoryId: string): Promise<SubjectCategory[]>{
    	return this.referencesService.getSubjectCategoriesByEducationInstitutionCategory(categoryId);
    }

    @Get('subjects/:category_id')
    getSubjectsByCategory(
        @Param('category_id', ParseUUIDPipe) categoryId: string,
        @Query() query: GetAllQueryDto
    ): Promise<Subject[]>{
    	return this.referencesService.getSubjectsByCategory(categoryId, query);
    }

    @Get('employment-types')
    getAllEmploymentTypes(): Promise<EmploymentType[]>{
    	return this.referencesService.getAllEmploymentTypes();
    }

    @Get('work-shedules')
    getAllWorkSchedules(): Promise<WorkSchedule[]>{
    	return this.referencesService.getAllWorkSchedules();
    }

    @Get('experience-ranges')
    getAllExperienceRanges(): Promise<ExperienceRange[]>{
    	return this.referencesService.getAllExperienceRanges();
    }

    @Get('document-types')
    getAllDocumentTypes(): Promise<DocumentType[]>{
        return this.referencesService.getAllDocumentTypes();
    }

    @Get('document-categories')
    getAllDocumentCategories(): Promise<DocumentCategory[]>{
        return this.referencesService.getAllDocumentCategories();
    }
}