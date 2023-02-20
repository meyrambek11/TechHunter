import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeacherDocument } from "./teacher-documents.entity";

@Entity('document_types')
export class DocumentType{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @OneToMany(() => TeacherDocument, (teacherDocument) => teacherDocument.type)
    teacherDocuments: TeacherDocument[];
}