import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	imports: [
		ConfigModule.forRoot(),
		JwtModule.register({
			secret: process.env.SECRET_KEY || 'SECRET',
			signOptions: {
				expiresIn: '24h',
			},
		}),
		UsersModule,
	],
	exports: []
})
export class AuthModule {}
