import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from './teachers.entity';

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

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    code: TeacherStatusCodes;

    @OneToMany(() => Teacher, (teacher) => teacher.status)
    teacher: Teacher[];
}