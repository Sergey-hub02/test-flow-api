import 'reflect-metadata'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class Role {
    @PrimaryGeneratedColumn('uuid')
    public guid: string

    @Column({ length: 255 })
    public name: string

    @Column({ length: 255 })
    public code: string

    @Column('text')
    public description: string

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
