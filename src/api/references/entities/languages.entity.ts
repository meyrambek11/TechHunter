import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}