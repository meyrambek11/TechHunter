import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum WorkScheduleCodes{
    FULL_DAY = 'full_day',
    SHIFT = 'shift',
    FLEXIBLE = 'flexible',
    DISTANT = 'distant'
}

@Entity('work_schedules')
export class WorkSchedule{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    code: WorkScheduleCodes;
}