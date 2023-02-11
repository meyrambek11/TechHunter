import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './cities.entity';
import { EducationalInstitutionList } from './educational-institutions-list.entity';
import { EducationalInstitution } from 'src/api/educational-institutions/entities/educational-institutions.entity';
import { Teacher } from 'src/api/teachers/entities/teachers.entity';

@Entity('countries')
export class Country{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @OneToMany(() => City, (city) => city.country)
    cities: City[];

    @OneToMany(() => EducationalInstitutionList, (educationalInstitutionList) => educationalInstitutionList.country)
    educationalInstitutionsList: EducationalInstitutionList[];

    @OneToMany(() => EducationalInstitution, (educationalInstitution) => educationalInstitution.country)
    educationalInstitutions: EducationalInstitution[];

    @OneToMany(() => Teacher, (teacher) => teacher.country)
    teachers: Teacher[];
}