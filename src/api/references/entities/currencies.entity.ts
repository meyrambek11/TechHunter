import { EducationalInstitutionOrder } from 'src/api/educational-institutions/entities/educational-institution-orders.entity';
import { ExperienceRange } from 'src/api/references/entities/experience-ranges.entity';
import { DocumentOrder } from 'src/api/teacher-documents/entities/document-orders.entity';
import { TeacherDocument } from 'src/api/teacher-documents/entities/teacher-documents.entity';
import { User } from 'src/api/users/users.entity';
import { Vacancy } from 'src/api/vacancies/vacancies.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum CurrencyCodes {
    TENGE = 'tg',
    DOLLAR = 'usd',
    RUBLE = 'rub',
  }

@Entity('currencies')
export class Currency{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    code: CurrencyCodes;

    @OneToMany(() => User, (user) => user.currency)
    users: User[];

    @OneToMany(() => EducationalInstitutionOrder, (educationalInstitutionOrder) => educationalInstitutionOrder.currency)
    educationalInstitutionOrders: EducationalInstitutionOrder[];

    @OneToMany(() => ExperienceRange, (experienceRange) => experienceRange.currency)
    experienceRanges: ExperienceRange[];

    @OneToMany(() => TeacherDocument, (teacherDocument) => teacherDocument.currency)
    teacherDocuments: TeacherDocument[];

    @OneToMany(() => DocumentOrder, (documentOrder) => documentOrder.currency)
    documentOrders: DocumentOrder[];

    @OneToMany(() => Vacancy, (vacancy) => vacancy.currency)
    vacancies: Vacancy[];
}