import { Teacher } from "src/api/teachers/entities/teachers.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeacherBasketType } from "./teacher-basket-types.entity";

@Entity('teacher_baskets')
export class TeacherBasket{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({nullable: false, default: false})
    isBuy: boolean;

    @ManyToOne(() => Teacher, (teacher) => teacher.teacherBaskets)
	teacher: Teacher;

    @ManyToOne(() => TeacherBasketType, (teacherBasketType) => teacherBasketType.teacherBaskets, { nullable: false })
	teacherBasketType: TeacherBasketType;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
	created_at: Date;

	@Column({ type: 'timestamp', default: () => 'NOW()', onUpdate: 'NOW()' })
	updated_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
}
