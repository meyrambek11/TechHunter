import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EducationalInstitutionCategory } from './educational-institution-categories.entity';
import { Subject } from './subjects.entity';

@Entity('subject_categories')
export class SubjectCategory{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @ManyToOne(() => EducationalInstitutionCategory, (educationalInstitutionCategory) => educationalInstitutionCategory.subjectCategories)
	educationalInstitutionCategory: EducationalInstitutionCategory;

    @OneToMany(() => Subject, (subject) => subject.subjectCategory)
    subjects: Subject[];
}