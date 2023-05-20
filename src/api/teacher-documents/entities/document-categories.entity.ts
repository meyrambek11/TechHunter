import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherDocument } from './teacher-documents.entity';

@Entity('document_categories')
export class DocumentCategory{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @OneToMany(() => TeacherDocument, (teacherDocument) => teacherDocument.category)
    teacherDocuments: TeacherDocument[];
}