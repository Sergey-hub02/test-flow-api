import 'reflect-metadata'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class Grade {
    @PrimaryGeneratedColumn('uuid')
    public guid: string

    @Column({ type: 'varchar', length: 255 })
    public name: string

    @Column({ type: 'varchar', length: 255 })
    public shortName: string

    @Column('int')
    public value: number

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
