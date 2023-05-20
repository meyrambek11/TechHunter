import { Injectable } from '@nestjs/common';
import { UserMetadata } from 'src/common/types/userMetadata';
import { ResponseDto } from './vacancy-requests.dto';
import { TeachersService } from '../teachers/services/teachers.service';
import { VacancyService } from '../vacancies/vacancies.service';
import { InjectRepository } from '@nestjs/typeorm';
import { VacancyRequest } from './entities/vacancy-requests.entity';
import { Repository } from 'typeorm';
import { VacancyRequestStatus, VacancyRequestStatusCodes } from './entities/vacancy-request-statuses.entity';
import { RoleCodes } from '../roles/roles.entity';

@Injectable()
export class VacancyRequestService{
	constructor(
        private teacherService: TeachersService, 
        private vacancyService: VacancyService,
        @InjectRepository(VacancyRequest)
        private vacancyRequestRepository: Repository<VacancyRequest>,
        @InjectRepository(VacancyRequestStatus)
        private vacancyRequestStatusRepository: Repository<VacancyRequestStatus>
	){}

	async responseTo(user: UserMetadata, payload: ResponseDto): Promise<{success: boolean}>{
		const teacher = await this.teacherService.getOneByUser(user.id);

		if(!teacher) return { success: false };

		const vacancyRequest = await this.vacancyRequestRepository.findOne({
			where: { teacher: { id: teacher.id }, vacancy: { id: payload.vacancy.id }, status: { code: VacancyRequestStatusCodes.NEW } }
		});

		if(vacancyRequest) return { success: false };

		const vacancy = await this.vacancyService.getOne(payload.vacancy.id);

		if(!vacancy) return { success: false };

		const status = await this.getStatusByCode(VacancyRequestStatusCodes.NEW);

		await this.vacancyRequestRepository.save({
			...payload,
			teacher: { id: teacher.id },
			educationalInstitution: { id: vacancy.educationalInstitution.id },
			status
		});

		return { success: true };
	}

	async getManyByCode(user: UserMetadata, code: VacancyRequestStatusCodes): Promise<VacancyRequest[]>{
		if(user.role.code == RoleCodes.EDUCATIONAL_INSTITUTION)
			return await this.vacancyRequestRepository.find({
				where: { educationalInstitution: { user: { id: user.id } }, status: { code } },
				relations: ['vacancy', 'teacher', 'teacher.user', 'status']
			});
		else if(user.role.code == RoleCodes.TEACHER)
			return await this.vacancyRequestRepository.find({
				where: { teacher: { user: { id: user.id } }, status: { code } },
				relations: ['vacancy', 'educationalInstitution', 'status']
			});
		return await this.vacancyRequestRepository.find({
			where: { status: { code } }
		});
	}

	async getStatusByCode(code: VacancyRequestStatusCodes): Promise<VacancyRequestStatus>{
		return await this.vacancyRequestStatusRepository.findOne({
			where: { code }
		});
	}

	async compliteResponse(user: UserMetadata, id: string): Promise<{success: boolean}>{
		const vacancyRequest = await this.vacancyRequestRepository.findOne({
			where: { id, educationalInstitution: { user: { id: user.id } }, status: { code: VacancyRequestStatusCodes.NEW } }
		});

		if(!vacancyRequest) return { success: false };

		const status = await this.getStatusByCode(VacancyRequestStatusCodes.COMPLETED);

		await this.vacancyRequestRepository.update(id, {
			status
		});
		return { success: true };
	}

	async rejectResponse(user: UserMetadata, id: string): Promise<{success: boolean}>{
		const vacancyRequest = await this.vacancyRequestRepository.findOne({
			where: { id, educationalInstitution: { user: { id: user.id } }, status: { code: VacancyRequestStatusCodes.NEW } }
		});

		if(!vacancyRequest) return { success: false };

		const status = await this.getStatusByCode(VacancyRequestStatusCodes.REJECT);

		await this.vacancyRequestRepository.update(id, {
			status
		});
		return { success: true };
	}

	async getAllStatuses(): Promise<VacancyRequestStatus[]>{
		return await this.vacancyRequestStatusRepository.find();
	}

}