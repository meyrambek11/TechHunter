import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalInstitutionsController } from './educational-institutions.controller';
import { EducationalInstitutionsService } from './services/educational-institutions.service';
import { EducationalInstitutionOrder } from './entities/educational-institution-orders.entity';
import { EducationalInstitution } from './entities/educational-institutions.entity';
import { EducationalInstitutionOrdersService } from './services/educational-institution-orders.service';

@Module({
    controllers: [EducationalInstitutionsController],
    providers: [EducationalInstitutionsService, EducationalInstitutionOrdersService],
    imports: [
		TypeOrmModule.forFeature([
			EducationalInstitution,
			EducationalInstitutionOrder,
		]),
	],
    exports: [EducationalInstitutionsService, EducationalInstitutionOrdersService]
})
export class EducationalInstitutionsModule {}
