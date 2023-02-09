import { Controller } from '@nestjs/common';
import { Body, Get, Patch, UseGuards } from '@nestjs/common/decorators';
import { UpdateUserDto } from './users.dto';
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

	@Get('account')
	getAccount(
		@UserInfo() user: UserMetadata,
	): Promise<User & {account: Teacher | null}>{
		return this.usersService.getAccount(user);
	}

	@Patch()
	update(
		@UserInfo() user: UserMetadata,
		@Body() payload: UpdateUserDto
	): Promise<User>{
		return this.usersService.update(user, payload);
	}

	@Patch('balance')
	topUpBalance(
		@UserInfo() user: UserMetadata,
		@Body('balance') balance: number
	): Promise<User>{
		return this.usersService.topUpBalance(user, balance);
	}
}