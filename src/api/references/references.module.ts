import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/cities.entity';
import { Country } from './entities/countries.entity';
import { Currency } from './entities/currencies.entity';
import { EducationDegree } from './entities/education-degrees.entity';
import { EducationalInstitutionCategory } from './entities/educational-institution-categories.entity';
import { EducationalInstitutionList } from './entities/educational-institutions-list.entity';
import { EmploymentType } from './entities/employment-types.entity';
import { Language } from './entities/languages.entity';
import { SubjectCategory } from './entities/subject-categories.entity';
import { Subject } from './entities/subjects.entity';
import { WorkShedule } from './entities/work-shedules.entity';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';

@Module({

	imports: [
		TypeOrmModule.forFeature([
			Country, 
			City, 
			Language, 
			Currency, 
			EmploymentType, 
			WorkShedule,
			EducationDegree,
			EducationalInstitutionCategory,
			EducationalInstitutionList,
			SubjectCategory,
			Subject
		]),
	],
	controllers: [ReferencesController],
	providers: [ReferencesService],
  exports: [ReferencesService]
})
export class ReferencesModule {}
