import { Controller, ParseUUIDPipe, Post } from '@nestjs/common';
import { Body, Get, Param, Req, UseGuards } from '@nestjs/common/decorators';
import { StoreUserDto } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UserMetadata } from 'src/common/types/userMetadata';
import { UserInfo } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { Teacher } from '../teachers/entities/teachers.entity';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController{
	constructor(private usersService: UsersService){}

	@Post()
	store(@Body() payload: StoreUserDto): Promise<User>{
		return this.usersService.store(payload);
	}

	@Get('account')
	getAccount(
		@UserInfo() user: UserMetadata,
	): Promise<User & {account: Teacher | null}>{
		return this.usersService.getAccount(user);
	}
}