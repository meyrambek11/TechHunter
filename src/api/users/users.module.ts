import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferencesModule } from '../references/references.module';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { RolesModule } from '../roles/roles.module';
import { TeachersModule } from '../teachers/teachers.module';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		TypeOrmModule.forFeature([User]),
		ReferencesModule,
		RolesModule,
		TeachersModule
	],
	exports: [UsersService]
})
export class UsersModule {}
