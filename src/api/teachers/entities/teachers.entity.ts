import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('teachers')
export class Teacher{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;
}