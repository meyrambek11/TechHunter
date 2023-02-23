import { Controller, Get, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guards';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { UserMetadata } from 'src/common/types/userMetadata';
import { Body, Param, Query } from '@nestjs/common/decorators';
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

	@Get(':id')
    getOne(
		@UserInfo() user: UserMetadata, 
		@Param('id', ParseUUIDPipe) id: string,
    ): Promise<Teacher & {info: Partial<Teacher>}>{
    	return this.teachersService.getOne(id, user);
    }

}