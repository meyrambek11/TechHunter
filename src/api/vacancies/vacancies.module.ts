import { Module } from '@nestjs/common';
import { VacancyController } from './vacancies.controller';
import { VacancyService } from './vacancies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from './entities/vacancies.entity';
import { VacancyRequest } from './entities/vacancy-requests.entity';
import { VacancyRequestStatus } from './entities/vacancy-request-statuses.entity';
import { EducationalInstitutionsModule } from '../educational-institutions/educational-institutions.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
			Vacancy,
            VacancyRequest,
            VacancyRequestStatus
		]),
        EducationalInstitutionsModule
    ],
    controllers: [VacancyController],
    providers: [VacancyService]
})
export class VacanciesModule {}
