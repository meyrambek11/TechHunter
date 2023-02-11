import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationalInstitutionsController } from './educational-institutions.controller';
import { EducationalInstitutionsService } from './educational-institutions.service';
import { EducationalInstitutionOrder } from './entities/educational-institution-orders.entity';
import { EducationalInstitution } from './entities/educational-institutions.entity';

@Module({
    controllers: [EducationalInstitutionsController],
    providers: [EducationalInstitutionsService],
    imports: [
		TypeOrmModule.forFeature([
			EducationalInstitution,
			EducationalInstitutionOrder,
		]),
	],
    exports: [EducationalInstitutionsService]
})
export class EducationalInstitutionsModule {}
