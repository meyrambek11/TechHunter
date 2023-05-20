import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { RolesModule } from './api/roles/roles.module';
import { ReferencesModule } from './api/references/references.module';
import { TeachersModule } from './api/teachers/teachers.module';
import { TeachersBasketModule } from './api/teachers-basket/teachers-basket.module';
import { EducationalInstitutionsModule } from './api/educational-institutions/educational-institutions.module';
import { VacanciesModule } from './api/vacancies/vacancies.module';
import { AdminModule } from './api/admin/admin.module';
import { TeacherDocumentsModule } from './api/teacher-documents/teacher-documents.module';
import { FilesModule } from './api/files/files.module';
import { VacancyRequestsModule } from './api/vacancy-requests/vacancy-requests.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: process.env.DB_URL,
			entities: ['dist/**/**/*.entity{.js,.ts}'],
			synchronize: true,
			namingStrategy: new SnakeNamingStrategy(),
		}),
		UsersModule,
		AuthModule,
		RolesModule,
		ReferencesModule,
		TeachersModule,
		TeachersBasketModule,
		EducationalInstitutionsModule,
		TeacherDocumentsModule,
		VacanciesModule,
		AdminModule,
		FilesModule,
		VacancyRequestsModule
	],
})
export class AppModule {}
