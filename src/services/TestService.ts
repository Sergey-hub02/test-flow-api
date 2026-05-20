import type { Repository } from 'typeorm'
import Test from '../entities/Test.js'
import Problem from '../entities/Problem.js'
import Task from '../entities/Task.js'
import AnswerVariant from '../entities/AnswerVariant.js'
import AppDataSource from '../config/database.js'

export default class TestService {
    private _testRepository: Repository<Test>
    private _problemRepository: Repository<Problem>
    private _taskRepository: Repository<Task>
    private _variantRepository: Repository<AnswerVariant>

    public constructor() {
        this._testRepository = AppDataSource.getRepository(Test)
        this._problemRepository = AppDataSource.getRepository(Problem)
        this._taskRepository = AppDataSource.getRepository(Task)
        this._variantRepository = AppDataSource.getRepository(AnswerVariant)
    }

    public create = async (test: Test) => {
        const existingTest = await this._testRepository.existsBy({
            name: test.name,
            discipline: { guid: test.discipline.guid },
        })

        if (existingTest) {
            throw new Error(`Тест "${test.name}" для дисциплины с guid = ${test.discipline.guid} уже есть в БД!`)
        }

        const newTest = await this._testRepository.save(test)

        test.problems.forEach(async problem => {
            await this._problemRepository.save(problem)

            problem.tasks.forEach(async task => {
                await this._taskRepository.save(task)

                if (task.variants && task.variants.length > 0) {
                    task.variants.forEach(async variant => {
                        await this._variantRepository.save(variant)
                    })
                }
            })
        })

        return newTest
    }

    public readAll = async () => {
        return await this._testRepository.find({
            select: {
                guid: true,
                name: true,
                description: true,
                author: {
                    guid: true,
                    lastName: true,
                    firstName: true,
                    secondName: true,
                    login: true,
                },
                discipline: true,
            },
            relations: {
                author: true,
                discipline: true,
            },
            order: { createdAt: 'DESC' },
        })
    }

    public readOne = async (guid: string) => {
        return await this._testRepository.findOne({
            where: { guid: guid },
            relations: {
                discipline: true,
                problems: {
                    tasks: {
                        variants: true,
                    },
                },
            },
        })
    }

    public readByDisciplineAndTest = async (disciplineGuid: string, testGuid: string) => {
        return await this._testRepository.findOne({
            select: {
                guid: true,
                name: true,
                description: true,
                duration: true,
                attemptsLimit: true,
                attempts: true,
                problems: true,
            },
            where: {
                discipline: { guid: disciplineGuid },
                guid: testGuid,
            },
            relations: {
                attempts: true,
                problems: true,
            },
        })
    }
}
