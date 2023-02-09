import { Body, Controller, Post, Req } from "@nestjs/common";
import { StoreUserDto } from "../users/users.dto";
import { User } from "../users/users.entity";
import { LoginDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { AuthInterface } from "./auth.type";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('login')
    login(@Body() payload: LoginDto): Promise<AuthInterface>{
        return this.authService.login(payload);
    }

    @Post('register')
    register(@Body() payload: StoreUserDto): Promise<AuthInterface>{
        return this.authService.register(payload);
    } 
}