import { UserMetadata } from "src/common/types/userMetadata";

export class BuyingLogicClass{
    constructor(){}

    checkHasUserEnoughMoney(user: UserMetadata, price: number): boolean{
        return user.balance > price;
    }

}