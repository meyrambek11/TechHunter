import { Teacher } from 'src/api/teachers/entities/teachers.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VacancyRequestStatus } from './vacancy-request-statuses.entity';
import { Vacancy } from '../../vacancies/vacancies.entity';
import { EducationalInstitution } from 'src/api/educational-institutions/entities/educational-institutions.entity';

@Entity('vacancy_requests')
export class VacancyRequest{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @ManyToOne(() => Vacancy, (vacancy) => vacancy.vacancyRequests, { nullable: false })
	vacancy: Vacancy;

    @ManyToOne(() => Teacher, (teacher) => teacher.vacancyRequests, { nullable: false })
	teacher: Teacher;

	@Column({ nullable: true })
	letter: string;

	@ManyToOne(() => EducationalInstitution, (educationInstitution) => educationInstitution.vacancyRequests, { nullable: false })
	educationalInstitution: EducationalInstitution;

    @ManyToOne(() => VacancyRequestStatus, (vacancyRequestStatus) => vacancyRequestStatus.vacancyRequests, { nullable: false })
	status: VacancyRequestStatus;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}