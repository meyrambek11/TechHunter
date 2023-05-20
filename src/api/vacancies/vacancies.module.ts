import { Module } from '@nestjs/common';
import { VacancyController } from './vacancies.controller';
import { VacancyService } from './vacancies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from './vacancies.entity';
import { EducationalInstitutionsModule } from '../educational-institutions/educational-institutions.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Vacancy,
		]),
		EducationalInstitutionsModule
	],
	controllers: [VacancyController],
	providers: [VacancyService]
})
export class VacanciesModule {}
