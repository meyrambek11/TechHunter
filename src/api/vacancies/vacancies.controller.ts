import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common';
import { GetVacanciesQuery, StoreVacancyDto } from './vacancies.dto';
import { VacancyService } from './vacancies.service';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { UserMetadata } from 'src/common/types/userMetadata';
import { Vacancy } from './vacancies.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';

@UseGuards(JwtAuthGuard)
@Controller('vacancy')
export class VacancyController{
	constructor(private vacancyService: VacancyService) {}

    @Post()
	store(
        @Body() payload: StoreVacancyDto,
        @UserInfo() user: UserMetadata
	): Promise<Vacancy>{
		return this.vacancyService.store(user, payload);
	}

    @Get()
    getAll(@Query() query: GetVacanciesQuery): Promise<Vacancy[]>{
    	return this.vacancyService.getAll(query);
    }

    @Delete('/:id')
    notActivate(
        @UserInfo() user: UserMetadata,
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<{success: boolean}>{
    	return this.vacancyService.notActivate(user, id);
    }

}