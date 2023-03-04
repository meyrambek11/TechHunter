import { EducationalInstitution } from "src/api/educational-institutions/entities/educational-institutions.entity";
import { Currency } from "src/api/references/entities/currencies.entity";
import { EmploymentType } from "src/api/references/entities/employment-types.entity";
import { ExperienceRange } from "src/api/references/entities/experience-ranges.entity";
import { Subject } from "src/api/references/entities/subjects.entity";
import { WorkSchedule } from "src/api/references/entities/work-schedules.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VacancyRequest } from "./vacancy-requests.entity";

@Entity('vacancies')
export class Vacancy{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: false})
    salary: number;

    @ManyToOne(() => Currency, (currency) => currency.vacancies, {nullable: false})
	currency: Currency;

    @Column({ type: 'text', nullable: true, array: true })
	responsibilities: string[];

    @Column({ type: 'text', nullable: true, array: true })
	requirements: string[];

    @Column({ type: 'text', nullable: true, array: true })
	conditions: string[];

    @ManyToOne(() => EducationalInstitution, (educationInstitution) => educationInstitution.vacancies)
	educationInstitution: EducationalInstitution;

    @ManyToOne(() => ExperienceRange, (experienceRange) => experienceRange.vacancies)
	experienceRange: ExperienceRange;

    @ManyToOne(() => EmploymentType, (employmentType) => employmentType.vacancies)
	employmentType: EmploymentType;

    @ManyToOne(() => WorkSchedule, (workSchedule) => workSchedule.vacancies)
	workSchedule: WorkSchedule;

    @ManyToMany(() => Subject)
	@JoinTable({
		name: 'vacancy_subject_relations',
		joinColumn: {
			name: 'vacancy_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'subject_id',
			referencedColumnName: 'id',
		},
	})
	subjects: Subject[];

    @OneToMany(() => VacancyRequest, (vacancyRequest) => vacancyRequest.vacancy)
    vacancyRequests: VacancyRequest[];

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}
