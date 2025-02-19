import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllQueryDto } from 'src/common/get-all.dto';
import { Brackets, ILike, Repository } from 'typeorm';
import { City } from './entities/cities.entity';
import { Country } from './entities/countries.entity';
import { Currency, CurrencyCodes } from './entities/currencies.entity';
import { EducationDegree } from './entities/education-degrees.entity';
import { EducationalInstitutionCategory } from './entities/educational-institution-categories.entity';
import { EducationalInstitutionList } from './entities/educational-institutions-list.entity';
import { EmploymentType } from './entities/employment-types.entity';
import { ExperienceRange, ExperienceRangeCodes } from './entities/experience-ranges.entity';
import { Language } from './entities/languages.entity';
import { SubjectCategory } from './entities/subject-categories.entity';
import { Subject } from './entities/subjects.entity';
import { WorkSchedule } from './entities/work-schedules.entity';
import { DocumentType } from '../teacher-documents/entities/document-types.entity';
import { DocumentCategory } from '../teacher-documents/entities/document-categories.entity';


@Injectable()
export class ReferencesService{
	constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
        @InjectRepository(City)
        private cityRepository: Repository<City>,
        @InjectRepository(EducationalInstitutionCategory)
        private educationalInstitutionCategoryRepository: Repository<EducationalInstitutionCategory>,
        @InjectRepository(EducationalInstitutionList)
        private educationalInstitutionListRepository: Repository<EducationalInstitutionList>,
        @InjectRepository(SubjectCategory)
        private subjectCategoryRepository: Repository<SubjectCategory>,
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>,
        @InjectRepository(Language)
        private languageRepository: Repository<Language>,
        @InjectRepository(Currency)
        private currencyRepository: Repository<Currency>,
        @InjectRepository(EducationDegree)
        private educationDegreeRepository: Repository<EducationDegree>,
        @InjectRepository(EmploymentType)
        private employmentTypeRepository: Repository<EmploymentType>,
        @InjectRepository(WorkSchedule)
        private workScheduleRepository: Repository<WorkSchedule>,
		@InjectRepository(ExperienceRange)
        private experienceRangeRepository: Repository<ExperienceRange>,
		@InjectRepository(DocumentType)
        private documentTypeRepository: Repository<DocumentType>,
		@InjectRepository(DocumentCategory)
        private documentCategoryRepository: Repository<DocumentCategory>,
	){}

	async getAllCountries(): Promise<Country[]>{
		return await this.countryRepository.find({
			order: { name: 'ASC' }
		});
	}

	async getCitiesByCountry(countryId: string, query: GetAllQueryDto): Promise<City[]>{
		return await this.cityRepository.find({
			where: {
				country: { id: countryId },
				name: ILike(query.keyword)
			},
			order: { name: 'ASC' }
		});
	}

	async getAllLanguages(): Promise<Language[]>{
		return await this.languageRepository.find();
	}

	async getAllCurrencies(): Promise<Currency[]>{
		return await this.currencyRepository.find();
	}

	async getAllEducationDegrees(): Promise<EducationDegree[]>{
		return await this.educationDegreeRepository.find();
	}

	async getAllEducationalInstitutionCategories(): Promise<EducationalInstitutionCategory[]>{
		return await this.educationalInstitutionCategoryRepository.find();
	}

	async getEducationalInstitutionListByCategory(categoryId: string, query: GetAllQueryDto): Promise<EducationalInstitutionList[]>{
		const educationalInstitutionListQuery = this.educationalInstitutionListRepository
			.createQueryBuilder('educationalInstitutionList')
			.orderBy('educationalInstitutionList.name', 'ASC')
			.select([
				'educationalInstitutionList.id',
				'educationalInstitutionList.name',
				'educationalInstitutionList.address',
			])
			.leftJoinAndSelect('educationalInstitutionList.educationalInstitutionCategory', 'educationalInstitutionCategory')
			.leftJoinAndSelect('educationalInstitutionList.country', 'country')
			.leftJoinAndSelect('educationalInstitutionList.city', 'city')
			.where('educationalInstitutionCategory.id = :categoryId', { categoryId });
        
		if(query.countryIds){
			const countryIds = query.countryIds.split(',');
			educationalInstitutionListQuery.andWhere('educationalInstitutionList.country_id IN (:...countryIds)', {
				countryIds,
			});
		}
		if(query.cityIds){
			const cityIds = query.cityIds.split(',');
			educationalInstitutionListQuery.andWhere('educationalInstitutionList.city_id IN (:...cityIds)', {
				cityIds,
			});
		}

		if (query.keyword != '%%') {
			educationalInstitutionListQuery.andWhere(
				new Brackets((qb) => {
					qb.where('educationalInstitutionList.name ILike :name', {
						name: query.keyword,
					});
				})
			);
		}

		return await educationalInstitutionListQuery.getMany();
	}

	async getSubjectCategoriesByEducationInstitutionCategory(educationalInstitutionCategoryId: string): Promise<SubjectCategory[]>{
		const categories = await this.subjectCategoryRepository.find({
			where: {
				educationalInstitutionCategory: { id: educationalInstitutionCategoryId }
			},
			relations: ['subjects']
		});

		for(const category of categories){
			for(const subject of category.subjects){
				subject['label'] = subject.name;
				subject['value'] = subject.id;
			}
		}
		return categories;
	}

	async getSubjectsByCategory(categoryId: string): Promise<Subject[]>{
		const subjects = await this.subjectRepository.find({
			where: {
				subjectCategory: { id: categoryId },
			}, 
		});

		for(const subject of subjects){
			subject['label'] = subject.name;
			subject['value'] = subject.id;
		}

		return subjects;
	}

	async getAllEmploymentTypes(): Promise<EmploymentType[]>{
		return await this.employmentTypeRepository.find();
	}

	async getAllWorkSchedules(): Promise<WorkSchedule[]>{
		return await this.workScheduleRepository.find();
	}

	async getAllExperienceRanges(): Promise<ExperienceRange[]>{
		return await this.experienceRangeRepository.find();
	}

	async getCurrencyByCode(code: CurrencyCodes): Promise<Currency>{
		return await this.currencyRepository.findOne({
			where: { code }
		});
	}

	async getExperienceRangeByCode(code:ExperienceRangeCodes): Promise<ExperienceRange>{
		return await this.experienceRangeRepository.findOne({
			where: { code }
		});
	}

	async getExperienceRangeWithPrice(code: ExperienceRangeCodes) : Promise<ExperienceRange>{
		return await this.experienceRangeRepository.findOne({
			where: { code },
			select: ['id', 'name', 'code', 'price'],
			relations: ['currency']
		});
	}

	async getExperiencesRangeWithPrice(): Promise<ExperienceRange[]>{
		return await this.experienceRangeRepository.find({
			select: ['id', 'name', 'code', 'price'],
			relations: ['currency']
		});
	}

	async getAllDocumentTypes(): Promise<DocumentType[]>{
		return await this.documentTypeRepository.find();
	}

	async getAllDocumentCategories(): Promise<DocumentCategory[]>{
		return await this.documentCategoryRepository.find();
	}
}