import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { UserMetadata } from 'src/common/types/userMetadata';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { VacancyRequestService } from './vacancy-requests.service';
import { ResponseDto } from './vacancy-requests.dto';
import { VacancyRequestStatus, VacancyRequestStatusCodes } from './entities/vacancy-request-statuses.entity';
import { VacancyRequest } from './entities/vacancy-requests.entity';

@UseGuards(JwtAuthGuard)
@Controller('vacancy-request')
export class VacancyRequestController{
	constructor(private vacancyRequestService: VacancyRequestService){}

    @Post('response')
	responseTo(
        @Body() payload: ResponseDto,
        @UserInfo() user: UserMetadata
	): Promise<{success: boolean}>{
		return this.vacancyRequestService.responseTo(user, payload);
	}

    @Get('own/:code')
    getManyByCode(
        @UserInfo() user: UserMetadata,
        @Param('code') code: VacancyRequestStatusCodes,
    ): Promise<VacancyRequest[]>{
    	return this.vacancyRequestService.getManyByCode(user, code);
    }

    @Post('accept/:id')
    compliteResponse(
        @UserInfo() user: UserMetadata,
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<{success: boolean}>{
    	return this.vacancyRequestService.compliteResponse(user, id);
    }

    @Post('reject/:id')
    rejectResponse(
        @UserInfo() user: UserMetadata,
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<{success: boolean}>{
    	return this.vacancyRequestService.rejectResponse(user, id);
    }

    @Get('statuses')
    getAllStatuses(): Promise<VacancyRequestStatus[]>{
    	return this.vacancyRequestService.getAllStatuses();
    }
}