import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TeacherStatusCodes{
    FREE = 'free',
    BUSY = 'busy',
    CONSIDER = 'consider'
}

@Entity('teacher_statuses')
export class TeacherStatus{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    code: TeacherStatusCodes;

    // @OneToMany(() => City, (city) => city.country)
    // cities: City[];
}