import { Teacher } from 'src/api/teachers/entities/teachers.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VacancyRequestStatus } from './vacancy-request-statuses.entity';
import { Vacancy } from '../../vacancies/vacancies.entity';

@Entity('vacancy_requests')
export class VacancyRequest{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @ManyToOne(() => Vacancy, (vacancy) => vacancy.vacancyRequests, { nullable: false })
	vacancy: Vacancy;

    @ManyToOne(() => Teacher, (teacher) => teacher.vacancyRequests, { nullable: false })
	teacher: Teacher;

    @ManyToOne(() => VacancyRequestStatus, (vacancyRequestStatus) => vacancyRequestStatus.vacancyRequests, { nullable: false })
	vacancyRequestStatus: VacancyRequestStatus;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}