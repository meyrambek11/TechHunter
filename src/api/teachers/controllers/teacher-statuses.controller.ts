import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guards';
import { TeacherStatus } from '../entities/teacher-statuses.entity';
import { TeacherStatusesService } from '../services/teacher-statuses.service';

@UseGuards(JwtAuthGuard)
@Controller('teacher-status')
export class TeacherStatusesController{
	constructor(private teacherStatusesService: TeacherStatusesService){}

    @Get()
	getAllStatuses(): Promise<TeacherStatus[]>{
		return this.teacherStatusesService.getAll();
	}
}