import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './countries.entity';
import { EducationalInstitutionList } from './educational-institutions-list.entity';

@Entity('cities')
export class City{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @ManyToOne(() => Country, (country) => country.cities)
	country: Country;

    @OneToMany(() => EducationalInstitutionList, (educationalInstitution) => educationalInstitution.city)
    educationalInstitutions: EducationalInstitutionList[];
}