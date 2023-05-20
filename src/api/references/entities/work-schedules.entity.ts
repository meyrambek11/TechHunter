import { Vacancy } from 'src/api/vacancies/vacancies.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

    @OneToMany(() => Vacancy, (vacancy) => vacancy.workSchedule)
    vacancies: Vacancy[];
}