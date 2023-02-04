import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateUserDto } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController{
	constructor(private usersService: UsersService){}

	@Post()
	store(@Body() payload: CreateUserDto): Promise<User>{
		return this.usersService.store(payload);
	}
}