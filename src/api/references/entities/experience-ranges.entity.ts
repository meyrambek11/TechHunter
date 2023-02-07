import { Currency } from "src/api/references/entities/currencies.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "../../teachers/entities/teachers.entity";

export enum ExperienceRangeCodes{
    WITHOUT_EXPERIENCE = 'without_experience',
    ONE_TO_THREE = 'one_to_three',
    THREE_TO_SIX = 'three_to_six',
    SIX_AND_MORE = 'six_and_more'
}

@Entity('experience_ranges')
export class ExperienceRange{
    @PrimaryGeneratedColumn('uuid')
	id: string;

    @Column({ nullable: false })
    name: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false, default: 0})
    price: number

    @Column({nullable: false})
    code: ExperienceRangeCodes;

    @ManyToOne(() => Currency, (currency) => currency.experienceRanges)
	currency: Currency;

    @OneToMany(() => Teacher, (teacher) => teacher.experienceRange)
    teacher: Teacher[];
}