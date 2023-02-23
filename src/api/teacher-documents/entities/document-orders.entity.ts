import { Currency } from "src/api/references/entities/currencies.entity";
import { User } from "src/api/users/users.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeacherDocument } from "./teacher-documents.entity";

@Entity('document_orders')
export class DocumentOrder{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({nullable: false})
    price: number;

    @ManyToOne(() => Currency, (currency) => currency.documentOrders)
	currency: Currency;

    @ManyToOne(() => User, (user) => user.purchasedDocuments)
	user: User;

    @ManyToOne(() => TeacherDocument, (document) => document.orders)
	document: TeacherDocument;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}