import { EducationalInstitution } from 'src/api/educational-institutions/entities/educational-institutions.entity';
import { Currency } from 'src/api/references/entities/currencies.entity';
import { EmploymentType } from 'src/api/references/entities/employment-types.entity';
import { ExperienceRange } from 'src/api/references/entities/experience-ranges.entity';
import { WorkSchedule } from 'src/api/references/entities/work-schedules.entity';
import { VacancyRequest } from 'src/api/vacancy-requests/entities/vacancy-requests.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectCategory } from '../references/entities/subject-categories.entity';

@Entity('vacancies')
export class Vacancy{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: false })
    salary: number;

    @ManyToOne(() => Currency, (currency) => currency.vacancies, { nullable: false })
	currency: Currency;

    @Column({ type: 'text', nullable: true })
	responsibility: string;

    @Column({ type: 'text', nullable: true })
	requirement: string;

    @Column({ type: 'text', nullable: true })
	condition: string;

	@Column({ nullable: false, default: true })
	isActive: boolean;

    @ManyToOne(() => EducationalInstitution, (educationInstitution) => educationInstitution.vacancies, { nullable: true })
	educationalInstitution: EducationalInstitution;

    @ManyToOne(() => ExperienceRange, (experienceRange) => experienceRange.vacancies, { nullable: false })
	experienceRange: ExperienceRange;

    @ManyToOne(() => EmploymentType, (employmentType) => employmentType.vacancies, { nullable: false })
	employmentType: EmploymentType;

    @ManyToOne(() => WorkSchedule, (workSchedule) => workSchedule.vacancies, { nullable: false })
	workSchedule: WorkSchedule;

    @ManyToOne(() => SubjectCategory, (subjectCategory) => subjectCategory.vacancies, { nullable: false })
	subjectCategory: SubjectCategory;

    @OneToMany(() => VacancyRequest, (vacancyRequest) => vacancyRequest.vacancy)
    vacancyRequests: VacancyRequest[];

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}
