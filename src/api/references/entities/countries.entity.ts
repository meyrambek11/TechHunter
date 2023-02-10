import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './cities.entity';
import { EducationalInstitutionList } from './educational-institutions-list.entity';

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

    @OneToMany(() => EducationalInstitutionList, (educationalInstitution) => educationalInstitution.country)
    educationalInstitutions: EducationalInstitutionList[];
}