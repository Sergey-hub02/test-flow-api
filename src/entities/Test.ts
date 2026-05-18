import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, type Relation } from 'typeorm'
import Discipline from './Discipline.js'
import User from './User.js'

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

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
