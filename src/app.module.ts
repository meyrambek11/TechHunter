import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { RolesModule } from './api/roles/roles.module';
import { ReferencesModule } from './api/references/references.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: process.env.DB_URL,
			entities: ['dist/**/**/*.entity{.js,.ts}'],
			synchronize: true,
			namingStrategy: new SnakeNamingStrategy(),
		}),
		UsersModule,
		AuthModule,
		RolesModule,
		ReferencesModule,
	],
})
export class AppModule {}
