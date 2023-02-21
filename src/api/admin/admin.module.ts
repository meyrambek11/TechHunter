import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { ReferencesModule } from '../references/references.module';

@Module({
	controllers: [AdminController],
	providers: [AdminService],
	imports: [
		TypeOrmModule.forFeature([
			User
		]),
		ReferencesModule
	],
	exports: [AdminService]
})
export class AdminModule {}
