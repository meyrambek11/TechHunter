import { Currency } from "src/api/references/entities/currencies.entity";
import { Role } from "src/api/roles/roles.entity";


export class UserMetadata {
    email: string;
    id: string;
    role: Role;
    isBan: boolean;
    currency: Currency;
    phoneNumber: string;
    balance: number;
}