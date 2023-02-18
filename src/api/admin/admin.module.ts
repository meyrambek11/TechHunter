import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

@Module({
	controllers: [AdminController],
	providers: [AdminService],
	imports: [
		TypeOrmModule.forFeature([
			User
		]),
	],
	exports: [AdminService]
})
export class AdminModule {}
