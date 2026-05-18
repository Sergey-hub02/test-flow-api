import 'reflect-metadata'
import { AfterLoad, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import User from './User.js'
import Test from './Test.js'

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

    @OneToMany(() => Test, test => test.discipline)
    public tests: Test[]

    public teachers: string[] = []

    @AfterLoad()
    private setTeachers() {
        if (!this.users || !this.users.length) {
            this.teachers = []
            return
        }

        this.teachers = this.users
            .filter(user => user.role.code === 'teacher')
            .map(user => `${user.lastName} ${user.firstName} ${user.secondName}`.trim())
    }

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
