import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role, RoleCodes } from './roles.entity';

@Injectable()
export class RolesService{
	constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
	){}

	async getRoles(): Promise<Role[]>{
		return await this.roleRepository.find({
			where: {
				code: In([RoleCodes.EDUCATIONAL_INSTITUTION, RoleCodes.TEACHER])
			}
		});
	}

	async getRoleByCode(code: RoleCodes): Promise<Role>{
		return await this.roleRepository.findOne({
			where: { code }
		});
	}
}