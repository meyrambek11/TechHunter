import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EducationalInstitutionList } from './educational-institutions-list.entity';
import { SubjectCategory } from './subject-categories.entity';

export enum EducationalInstitutionCategoryCodes{
    UNIVERSITY = 'university',
    SCHOOL = 'school',
    COLLEGE = 'college',
    KINDERGARTEN = 'kindergarten'
}

@Entity('educational_institution_categories')
export class EducationalInstitutionCategory{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    code: EducationalInstitutionCategoryCodes;

    @OneToMany(() => EducationalInstitutionList, (educationalInstitutionList) => educationalInstitutionList.educationalInstitutionCategory)
    educationalInstitutionsList: EducationalInstitutionList[];

    @OneToMany(() => SubjectCategory, (subjectCategory) => subjectCategory.educationalInstitutionCategory)
    subjectCategories: SubjectCategory[];
}