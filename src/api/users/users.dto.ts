import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { Currency } from '../references/entities/currencies.entity';
import { RoleCodes } from '../roles/roles.entity';

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

export class UpdateUserDto{
    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsObject()
    @IsOptional()
    currency?: Currency;
}