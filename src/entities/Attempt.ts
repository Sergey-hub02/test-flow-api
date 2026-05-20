import 'reflect-metadata'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, type Relation } from 'typeorm'
import Test from './Test.js'
import User from './User.js'
import Grade from './Grade.js'

@Entity()
export default class Attempt {
    @PrimaryGeneratedColumn('uuid')
    public guid: string

    @Column('decimal', { nullable: true })
    public linearGrade: number

    @Column('decimal', { nullable: true })
    public nonLinearGrade: number

    @ManyToOne(() => Test, { nullable: false })
    public test: Relation<Test>

    @ManyToOne(() => User, { nullable: false })
    public user: Relation<User>

    @ManyToOne(() => Grade, { nullable: true })
    public grade: Relation<Grade>

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
