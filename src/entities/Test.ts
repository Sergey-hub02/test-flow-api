import 'reflect-metadata'
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, type Relation } from 'typeorm'
import Discipline from './Discipline.js'
import User from './User.js'
import Problem from './Problem.js'
import Attempt from './Attempt.js'

@Entity()
export default class Test {
    @PrimaryGeneratedColumn('uuid')
    public guid: string

    @Column()
    public name: string

    @Column('text')
    public description: string

    @Column('int')
    public attemptsLimit: number

    @Column('int')
    public duration: number

    @ManyToOne(() => Discipline, { nullable: false })
    public discipline: Relation<Discipline>

    @ManyToOne(() => User, { nullable: false })
    public author: Relation<User>

    @OneToMany(() => Problem, problem => problem.test)
    public problems: Problem[]

    @OneToMany(() => Attempt, attempt => attempt.test)
    public attempts: Attempt[]

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
