import { Controller, Get } from '@nestjs/common';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController{
	constructor(private rolesService: RolesService){}

    @Get()
	getRoles(): Promise<Role[]>{
		return this.rolesService.getRoles();
	}
}