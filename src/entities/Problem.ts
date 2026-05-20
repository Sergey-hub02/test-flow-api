import 'reflect-metadata'
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, type Relation } from 'typeorm'
import Test from './Test.js'
import Task from './Task.js'

@Entity()
export default class Problem {
    @PrimaryGeneratedColumn('uuid')
    public guid: string

    @Column('text')
    public wording: string

    @ManyToOne(() => Test, { nullable: false })
    public test: Relation<Test>

    @OneToMany(() => Task, task => task.problem)
    public tasks: Task[]

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
