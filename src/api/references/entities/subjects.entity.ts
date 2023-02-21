import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectCategory } from './subject-categories.entity';

@Entity('subjects')
export class Subject{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @ManyToOne(() => SubjectCategory, (subjectCategory) => subjectCategory.subjects)
	subjectCategory: SubjectCategory;
}