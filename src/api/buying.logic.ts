import { UserMetadata } from 'src/common/types/userMetadata';
import { Currency } from './references/entities/currencies.entity';
import { User } from './users/users.entity';

export class BuyingLogicClass{
	checkHasUserEnoughMoney(user: User, price: number, currency: Currency): boolean{
		return user.balance > price;
	}
}