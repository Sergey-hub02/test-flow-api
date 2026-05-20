import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn, type Relation } from 'typeorm'
import Problem from './Problem.js'
import AnswerVariant from './AnswerVariant.js'

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export default class Task {
    @PrimaryGeneratedColumn('uuid')
    public guid: string

    @Column('text')
    public wording: string

    @ManyToOne(() => Problem, { nullable: false })
    public problem: Relation<Problem>

    @OneToMany(() => AnswerVariant, variant => variant.task)
    public variants: AnswerVariant[]

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
