import { EducationalInstitutionCategory } from "src/api/references/entities/educational-institution-categories.entity";
import { Language } from "src/api/references/entities/languages.entity";
import { Teacher } from "src/api/teachers/entities/teachers.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DocumentType } from "./document-types.entity";
import { DocumentCategory } from "./document-categories.entity";
import { Currency } from "src/api/references/entities/currencies.entity";
import { Subject } from "src/api/references/entities/subjects.entity";
import { DocumentOrder } from "./document-orders.entity";

@Entity('teacher_documents')
export class TeacherDocument{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({nullable: false})
    price: number;

    @Column({nullable: false, select: false})
    url: string;

    @Column({nullable: false, default: true})
    saleAccess: boolean;

    @Column({nullable: false, default: true})
    viewProfileAccess: boolean;

    @ManyToOne(() => Currency, (currency) => currency.teacherDocuments)
	currency: Currency;

    @ManyToMany(() => Subject)
	@JoinTable({
		name: 'document_subject_relations',
		joinColumn: {
			name: 'document_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'subject_id',
			referencedColumnName: 'id',
		},
	})
	subjects: Subject[];

    @ManyToOne(() => Language, (language) => language.teacherDocuments)
	language: Language;

    @ManyToOne(() => Teacher, (teacher) => teacher.documents)
	teacher: Teacher;

    @ManyToOne(() => EducationalInstitutionCategory, (educationalInstitutionCategory) => educationalInstitutionCategory.teacherDocuments)
	educationalInstitutionCategory: EducationalInstitutionCategory;

    @ManyToOne(() => DocumentType, (type) => type.teacherDocuments)
	type: DocumentType;

    @ManyToOne(() => DocumentCategory, (category) => category.teacherDocuments)
	category: DocumentCategory;

	@OneToMany(() => DocumentOrder, (documentOrder) => documentOrder.document)
    orders: DocumentOrder[];

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}
