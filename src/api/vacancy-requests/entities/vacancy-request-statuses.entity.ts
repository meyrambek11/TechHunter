import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VacancyRequest } from './vacancy-requests.entity';

export enum VacancyRequestStatusCodes{
    REJECT = 'reject',
    COMPLETED = 'complited',
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
  
    @OneToMany(() => VacancyRequest, (vacancyRequest) => vacancyRequest.status)
    vacancyRequests: VacancyRequest[];
}