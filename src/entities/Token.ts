import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import User from './User.js'

@Entity()
export default class Token {
    @PrimaryGeneratedColumn('uuid')
    public guid: string

    @ManyToOne(() => User)
    public user: User

    @Column('text')
    public accessToken: string

    @Column('text')
    public refreshToken: string

    @Column('timestamp')
    public expiresAt: Date

    @Column('timestamp')
    public refreshExpiresAt: Date

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date
}
