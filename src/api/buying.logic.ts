import { UserMetadata } from 'src/common/types/userMetadata';
import { Currency } from './references/entities/currencies.entity';

export class BuyingLogicClass{
	checkHasUserEnoughMoney(user: UserMetadata, price: number, currency: Currency): boolean{
		return user.balance > price;
	}

}