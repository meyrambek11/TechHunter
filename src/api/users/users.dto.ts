import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
    role_id: string;
}