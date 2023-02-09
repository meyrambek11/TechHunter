import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherStatus } from './entities/teacher-statuses.entity';
import { Teacher } from './entities/teachers.entity';
import { TeachersController } from './controllers/teachers.controller';
import { TeachersService } from './services/teachers.service';
import { TeacherStatusesService } from './services/teacher-statuses.service';
import { ReferencesModule } from '../references/references.module';
import { TeacherStatusesController } from './controllers/teacher-statuses.controller';

@Module({
	controllers: [TeachersController, TeacherStatusesController],
	providers: [TeachersService, TeacherStatusesService],
	imports: [
		TypeOrmModule.forFeature([
			Teacher,
			TeacherStatus,
		]),
		ReferencesModule
	],
	exports: [TeachersService]
})
export class TeachersModule {}
