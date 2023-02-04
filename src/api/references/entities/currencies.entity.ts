import { User } from 'src/api/users/users.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum CurrencyCodes {
    TENGE = 'tg',
    DOLLAR = 'usd',
    RUBLE = 'rub',
  }

@Entity('currencies')
export class Currency{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    code: CurrencyCodes;

    @OneToMany(() => User, (user) => user.currency)
    users: User[];
}