import 'reflect-metadata'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

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

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
