import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RoleCodes } from "../roles/roles.entity";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    role: RoleCodes;
}