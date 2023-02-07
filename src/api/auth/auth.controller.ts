import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../users/users.dto";
import { User } from "../users/users.entity";
import { LoginDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('login')
    login(@Body() payload: LoginDto): Promise<User & {access_token: string}>{
        return this.authService.login(payload);
    }

    @Post('register')
    register(@Body() payload: CreateUserDto): Promise<User & {access_token: string}>{
        return this.authService.register(payload);
    } 
}