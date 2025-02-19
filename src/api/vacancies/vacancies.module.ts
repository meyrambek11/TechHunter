import { Module } from '@nestjs/common';
import { VacancyController } from './vacancies.controller';
import { VacancyService } from './vacancies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from './vacancies.entity';
import { EducationalInstitutionsModule } from '../educational-institutions/educational-institutions.module';
import { TeachersModule } from '../teachers/teachers.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Vacancy
		]),
		EducationalInstitutionsModule,
		TeachersModule
	],
	controllers: [VacancyController],
	providers: [VacancyService],
	exports: [VacancyService]
})
export class VacanciesModule {}
