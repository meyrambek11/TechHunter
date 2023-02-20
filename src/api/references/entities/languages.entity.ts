import { TeacherDocument } from 'src/api/teacher-documents/entities/teacher-documents.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum LanguageCodes {
    KAZAKH = 'kz',
    ENGLISH = 'en',
    RUSSIAN = 'ru'
  }

@Entity('languages')
export class Language{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    code: LanguageCodes;

    @OneToMany(() => TeacherDocument, (teacherDocument) => teacherDocument.language)
    teacherDocuments: TeacherDocument[];
}