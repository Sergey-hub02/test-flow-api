import 'reflect-metadata'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Role from './Role.js'

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

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
