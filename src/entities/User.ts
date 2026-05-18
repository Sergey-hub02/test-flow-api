import 'reflect-metadata'
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Role from './Role.js'
import Discipline from './Discipline.js'

@Entity()
export default class User {
    @PrimaryGeneratedColumn('uuid')
    public guid: string

    @Column({ type: 'text', nullable: true })
    public photo?: string

    @Column({ length: 255 })
    public lastName: string

    @Column({ length: 255 })
    public firstName: string

    @Column({ nullable: true, length: 255 })
    public secondName?: string

    @Column({ length: 255 })
    public login: string

    @Column('text')
    public password: string

    @Column('date')
    public birthday: Date

    @ManyToOne(() => Role)
    public role: Role

    @ManyToMany(() => Discipline, discipline => discipline.users)
    @JoinTable()
    public disciplines: Discipline[]

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
