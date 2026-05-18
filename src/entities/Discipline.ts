import 'reflect-metadata'
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import User from './User.js'

@Entity()
export default class Discipline {
    @PrimaryGeneratedColumn('uuid')
    public guid: string

    @Column({ type: 'text', nullable: true })
    public photo: string

    @Column()
    public name: string

    @Column('text')
    public description: string

    @ManyToMany(() => User, user => user.disciplines)
    public users: User[]

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
