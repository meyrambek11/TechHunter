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
import { TeacherDocumentsModule } from './api/teacher-documents/teacher-documents.module';
import { VacanciesModule } from './api/vacancies/vacancies.module';

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
	],
})
export class AppModule {}
