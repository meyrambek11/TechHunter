import { Teacher } from 'src/api/teachers/entities/teachers.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

    @OneToMany(() => Teacher, (teacher) => teacher.educationDegree)
    teacher: Teacher[];
}