import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum EmploymentTypeCodes{
    FULL = 'full',
    PARTTIME = 'part-time',
    PROJECT_WORK = 'project_work',
    INTERSHIP = 'internship'
}

@Entity('employment_types')
export class EmploymentType{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    code: EmploymentTypeCodes;
}