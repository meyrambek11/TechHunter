import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guards';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { UserMetadata } from 'src/common/types/userMetadata';
import { Body, Query } from '@nestjs/common/decorators';
import { StoreTeacherDto, TeacherQueryDto } from '../teachers.dto';
import { Teacher } from '../entities/teachers.entity';

@UseGuards(JwtAuthGuard)
@Controller('teacher')
export class TeachersController{
	constructor(private teachersService: TeachersService){}

    @Get()
	getAll(@Query() query: TeacherQueryDto): Promise<Teacher[]>{
		return this.teachersService.getAll(query);
	}

    @Patch()
    update(@UserInfo() user: UserMetadata, @Body() payload: StoreTeacherDto): Promise<Teacher>{
    	return this.teachersService.update(user, payload);
    }
}