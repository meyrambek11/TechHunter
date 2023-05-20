import { Module } from '@nestjs/common';
import { VacancyRequestController } from './vacancy-requests.controller';
import { VacancyRequestService } from './vacancy-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyRequest } from './entities/vacancy-requests.entity';
import { VacancyRequestStatus } from './entities/vacancy-request-statuses.entity';
import { TeachersModule } from '../teachers/teachers.module';
import { VacanciesModule } from '../vacancies/vacancies.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			VacancyRequest,
			VacancyRequestStatus
		]),
		TeachersModule,
		VacanciesModule
	],
	controllers: [VacancyRequestController],
	providers: [VacancyRequestService]
})
export class VacancyRequestsModule {}
