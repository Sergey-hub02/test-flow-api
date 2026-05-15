import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

import Role from '../entities/Role.js'
import User from '../entities/User.js'

dotenv.config()

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    port: process.env.DB_PORT as unknown as number,
    entities: [Role, User],
    synchronize: true,
})

export default AppDataSource
