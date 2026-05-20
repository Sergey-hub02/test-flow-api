import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

import Role from '../entities/Role.js'
import User from '../entities/User.js'
import Token from '../entities/Token.js'
import Discipline from '../entities/Discipline.js'
import Test from '../entities/Test.js'
import Problem from '../entities/Problem.js'
import Attempt from '../entities/Attempt.js'
import Grade from '../entities/Grade.js'
import Task from '../entities/Task.js'
import SingleAnswerTask from '../entities/SingleAnswerTask.js'
import MultipleAnswersTask from '../entities/MultipleAnswersTask.js'
import TextAnswerTask from '../entities/TextAnswerTask.js'
import AnswerVariant from '../entities/AnswerVariant.js'

dotenv.config()

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    port: process.env.DB_PORT as unknown as number,
    entities: [
        Role,
        User,
        Token,
        Discipline,
        Test,
        Problem,
        Attempt,
        Grade,
        Task,
        SingleAnswerTask,
        MultipleAnswersTask,
        TextAnswerTask,
        AnswerVariant,
    ],
    synchronize: true,
})

export default AppDataSource
