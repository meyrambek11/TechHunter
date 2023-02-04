import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './cities.entity';
import { Country } from './countries.entity';
import { EducationalInstitutionCategory } from './educational-institution-categories.entity';

@Entity('educational_institutions_list')
export class EducationalInstitutionList{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    address: string;

    @ManyToOne(() => EducationalInstitutionCategory, (educationalInstitutionCategory) => educationalInstitutionCategory.educationalInstitutionsList)
	educationalInstitutionCategory: EducationalInstitutionCategory;

    @ManyToOne(() => Country, (country) => country.educationalInstitutionsList)
	country: Country;

    @ManyToOne(() => City, (city) => city.educationalInstitutionsList)
	city: City;
}