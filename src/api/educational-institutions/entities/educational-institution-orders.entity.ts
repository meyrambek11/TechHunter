import { Currency } from 'src/api/references/entities/currencies.entity';
import { Teacher } from 'src/api/teachers/entities/teachers.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EducationalInstitution } from './educational-institutions.entity';

@Entity('educational_institution_orders')
export class EducationalInstitutionOrder{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    price: number;

    @ManyToOne(() => Currency, (currency) => currency.educationalInstitutionOrders)
	currency: Currency;

    @ManyToOne(() => Teacher, (teacher) => teacher.educationalInstitutionOrders)
	teacher: Teacher;

    @ManyToOne(() => EducationalInstitution, (educationalInstitution) => educationalInstitution.educationalInstitutionOrders)
	educationalInstitution: EducationalInstitution;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}