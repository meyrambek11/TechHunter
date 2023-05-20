import { EducationalInstitutionOrder } from 'src/api/educational-institutions/entities/educational-institution-orders.entity';
import { EducationDegree } from 'src/api/references/entities/education-degrees.entity';
import { EducationalInstitutionCategory } from 'src/api/references/entities/educational-institution-categories.entity';
import { User } from 'src/api/users/users.entity';
import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExperienceRange } from '../../references/entities/experience-ranges.entity';
import { TeacherStatus } from './teacher-statuses.entity';
import { Country } from 'src/api/references/entities/countries.entity';
import { City } from 'src/api/references/entities/cities.entity';
import { Subject } from 'src/api/references/entities/subjects.entity';
import { TeacherBasket } from 'src/api/teachers-basket/entities/teacher-baskets.entity';
import { TeacherDocument } from 'src/api/teacher-documents/entities/teacher-documents.entity';
import { VacancyRequest } from 'src/api/vacancy-requests/entities/vacancy-requests.entity';

@Entity('teachers')
export class Teacher{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @OneToOne(() => User, {
    	nullable: false,
    })
	@JoinColumn()
	user: User;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    middleName: string;

    @Column({ nullable: true })
    photo: string;

    @Column({ type: 'timestamp', nullable: true })
    birthdayDate: Date;

    @Column('jsonb', { nullable: true })
    experiences: object[];

    @Column('jsonb',{ nullable: true })
    educations: object[];

    @Column({ nullable: true, type: 'text' })
    wantedPosition: string;

    @Column({ nullable: true, type: 'text' })
    aboutYourself: string;

    @ManyToOne(() => EducationalInstitutionCategory, (educationalInstitutionCategory) => educationalInstitutionCategory.teachers)
	educationalInstitutionCategory: EducationalInstitutionCategory;

    @ManyToOne(() => TeacherStatus, (teacherStatus) => teacherStatus.teacher, { nullable: false })
	status: TeacherStatus;

    @ManyToOne(() => EducationDegree, (educationDegree) => educationDegree.teacher)
	educationDegree: EducationDegree;

    @ManyToOne(() => ExperienceRange, (experienceRange) => experienceRange.teachers, { nullable: false })
	experienceRange: ExperienceRange;

    @OneToMany(() => EducationalInstitutionOrder, (educationalInstitutionOrder) => educationalInstitutionOrder.teacher)
    educationalInstitutionOrders: EducationalInstitutionOrder[];

    @OneToMany(() => TeacherBasket, (teacherBasket) => teacherBasket.teacher)
    teacherBaskets: TeacherBasket[];

    @ManyToOne(() => Country, (country) => country.teachers)
	country: Country;

    @ManyToOne(() => City, (city) => city.teachers)
	city: City;

    @OneToMany(() => TeacherDocument, (document) => document.teacher)
    documents: TeacherDocument[];

    @OneToMany(() => VacancyRequest, (vacancyRequest) => vacancyRequest.teacher)
    vacancyRequests: VacancyRequest[];

    @ManyToMany(() => Subject)
	@JoinTable({
		name: 'teacher_subject_relations',
		joinColumn: {
			name: 'teacher_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'subject_id',
			referencedColumnName: 'id',
		},
	})
	subjects: Subject[];

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}