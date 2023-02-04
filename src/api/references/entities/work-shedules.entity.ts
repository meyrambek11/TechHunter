import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum WorkSheduleCodes{
    FULL_DAY = 'full_day',
    SHIFT = 'shift',
    FLEXIBLE = 'flexible',
    DISTANT = 'distant'
}

@Entity('work_shedules')
export class WorkShedule{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    code: WorkSheduleCodes;
}