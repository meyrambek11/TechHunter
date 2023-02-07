import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RoleCodes } from "../roles/roles.entity";

export class StoreUserDto{
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    role: RoleCodes;
}