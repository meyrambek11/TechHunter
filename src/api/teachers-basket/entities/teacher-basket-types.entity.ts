import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeacherBasket } from "./teacher-baskets.entity";

export enum TeacherBasketTypeCodes{
    DOCUMENT = 'document',
    VACANCY = 'vacancy'
}

@Entity('teacher_basket_types')
export class TeacherBasketType{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    code: TeacherBasketTypeCodes;

    @OneToMany(() => TeacherBasket, (teacherBasket) => teacherBasket.teacherBasketType)
    teacherBaskets: TeacherBasket[];
}