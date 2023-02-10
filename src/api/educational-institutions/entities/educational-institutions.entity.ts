import { City } from "src/api/references/entities/cities.entity";
import { Country } from "src/api/references/entities/countries.entity";
import { EducationalInstitutionCategory } from "src/api/references/entities/educational-institution-categories.entity";
import { User } from "src/api/users/users.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('educational_institution')
export class EducationalInstitution{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @OneToOne(() => User, {
    	nullable: false,
    })
	@JoinColumn()
	user: User;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    aboutYourself: string;

    @ManyToOne(() => EducationalInstitutionCategory, (educationalInstitutionCategory) => educationalInstitutionCategory.educationalInstitutions)
	educationalInstitutionCategory: EducationalInstitutionCategory;

    @ManyToOne(() => Country, (country) => country.educationalInstitutions)
	country: Country;

    @ManyToOne(() => City, (city) => city.educationalInstitutions)
	city: City;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}