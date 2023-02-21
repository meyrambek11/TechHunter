import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController{
	constructor(private adminService: AdminService) {}

	@Get('teachers/price')
	getTeachersPrice(){
		return this.adminService.getTeachersPrice();
	}
}