import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum EducationDegreeCodes {
    BACHELOR = 'bachelor',
    MASTER = 'master',
    DOCTOR = 'doctor'
  }

@Entity('education_degrees')
export class EducationDegree{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    code: EducationDegreeCodes;
}