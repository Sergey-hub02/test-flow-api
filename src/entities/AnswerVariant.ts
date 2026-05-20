import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, type Relation } from 'typeorm'
import Task from './Task.js'

@Entity()
export default class AnswerVariant {
    @PrimaryGeneratedColumn('uuid')
    public guid: string

    @Column('text')
    public wording: string

    @ManyToOne(() => Task, { nullable: false })
    public task: Relation<Task>

    @Column('boolean')
    public correct: boolean

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
