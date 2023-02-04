import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
	email: string;

    @Column({ nullable: true, select: false })
	password?: string;

    @Column({ nullable: true })
	phone_number: string;

    @Column({ nullable: false, default: 0 })
	balance: number;

    @Column({ nullable: false, default: false })
    is_ban: boolean;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}