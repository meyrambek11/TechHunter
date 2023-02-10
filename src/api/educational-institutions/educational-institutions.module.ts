import { Module } from '@nestjs/common';
import { EducationalInstitutionsController } from './educational-institutions.controller';
import { EducationalInstitutionsService } from './educational-institutions.service';

@Module({
    controllers: [EducationalInstitutionsController],
    providers: [EducationalInstitutionsService]
})
export class EducationalInstitutionsModule {}
