import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./auth.dto";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.entity";
import { JwtService } from "@nestjs/jwt";
import { StoreUserDto } from "../users/users.dto";

@Injectable()
export class AuthService{
    constructor(private userService: UsersService,  private jwtService: JwtService){}

    async login(payload: LoginDto): Promise<User & {access_token: string}>{
        const user = await this.validate(payload);
        const accessToken = this.generateToken(user);
        delete user['password'];
        return {
            ...user,
            access_token: accessToken
        }
    }

    async register(payload: StoreUserDto): Promise<User & {access_token: string}>{
        const candidate = await this.userService.getOneByEmail(payload.email);
        if(candidate) throw new HttpException(
            "Пользователь с таким email уже существует",
            HttpStatus.BAD_REQUEST
          );
        const hashPassword = await bcrypt.hash(payload.password, 10);
        const user = await this.userService.store({
            ...payload,
            password: hashPassword,
          });
        const accessToken = this.generateToken(user);
        delete user['password'];
        return {
            ...user,
            access_token: accessToken
        }
    }

    async validate(payload: LoginDto): Promise<User>{
        const user = await this.userService.getOneByEmail(payload.email);
        if (!user) throw new HttpException(
                "Пользователь с таким email не существует",
                HttpStatus.BAD_REQUEST
            );
        const passwordEqual = await bcrypt.compare(
            payload.password,
            user.password
        );
        if (!passwordEqual) throw new UnauthorizedException("Некорректный пароль");
		return user;
    }

    generateToken(user: User): string{
        return this.jwtService.sign({...user});
    }
}