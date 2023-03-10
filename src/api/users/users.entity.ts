import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Currency } from '../references/entities/currencies.entity';
import { Role } from '../roles/roles.entity';
import { DocumentOrder } from '../teacher-documents/entities/document-orders.entity';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
	email: string;

    @Column({ nullable: true, select: false })
	password?: string;

    @Column({ nullable: true })
	phoneNumber: string;

    @Column({ nullable: false, default: 0 })
	balance: number;

	@ManyToOne(() => Currency, (currency) => currency.users)
	currency: Currency;

    @Column({ nullable: false, default: false })
    isBan: boolean;

	@ManyToOne(() => Role, (role) => role.users, { nullable: false })
	role: Role;

	@OneToMany(() => DocumentOrder, (documentOrder) => documentOrder.user)
    purchasedDocuments: DocumentOrder[];

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}