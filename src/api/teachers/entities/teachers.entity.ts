import { EducationDegree } from 'src/api/references/entities/education-degrees.entity';
import { EducationalInstitutionCategory } from 'src/api/references/entities/educational-institution-categories.entity';
import { User } from 'src/api/users/users.entity';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExperienceRange } from '../../references/entities/experience-ranges.entity';
import { TeacherStatus } from './teacher-statuses.entity';

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

    @ManyToOne(() => EducationalInstitutionCategory, (educationalInstitutionCategory) => educationalInstitutionCategory.teacher)
	educationalInstitutionCategory: EducationalInstitutionCategory;

    @ManyToOne(() => TeacherStatus, (teacherStatus) => teacherStatus.teacher, { nullable: false })
	status: TeacherStatus;

    @ManyToOne(() => EducationDegree, (educationDegree) => educationDegree.teacher)
	educationDegree: EducationDegree;

    @ManyToOne(() => ExperienceRange, (experienceRange) => experienceRange.teacher, { nullable: false })
	experienceRange: ExperienceRange;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}