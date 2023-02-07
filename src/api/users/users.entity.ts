import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Currency } from '../references/entities/currencies.entity';
import { Role } from '../roles/roles.entity';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
	email: string;

    @Column({ nullable: true})
	password?: string;

    @Column({ nullable: true })
	phoneNumber: string;

    @Column({ nullable: false, default: 0 })
	balance: number;

	@ManyToOne(() => Currency, (currency) => currency.users)
	currency: Currency;

    @Column({ nullable: false, default: false })
    is_ban: boolean;

	@ManyToOne(() => Role, (role) => role.users, {nullable: false})
	role: Role;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}