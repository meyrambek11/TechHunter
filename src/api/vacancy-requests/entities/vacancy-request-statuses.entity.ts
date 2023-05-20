import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VacancyRequest } from './vacancy-requests.entity';

export enum VacancyRequestStatusCodes{
    ACTIVE = 'active',
    REJECT = 'reject',
    COMPLETED = 'completed',
    NEW = 'new'
}

@Entity('vacancy_request_statuses')
export class VacancyRequestStatus{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    code: VacancyRequestStatusCodes;
  
    @OneToMany(() => VacancyRequest, (vacancyRequest) => vacancyRequest.vacancyRequestStatus)
    vacancyRequests: VacancyRequest[];
}