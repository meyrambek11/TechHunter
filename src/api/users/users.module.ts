import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferencesModule } from '../references/references.module';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { RolesModule } from '../roles/roles.module';
import { TeachersModule } from '../teachers/teachers.module';
import { EducationalInstitutionsModule } from '../educational-institutions/educational-institutions.module';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		TypeOrmModule.forFeature([User]),
		ReferencesModule,
		RolesModule,
		TeachersModule,
		EducationalInstitutionsModule
	],
	exports: [UsersService]
})
export class UsersModule {}
