import type { Repository } from 'typeorm'
import Test from '../entities/Test.js'
import AppDataSource from '../config/database.js'

export default class TestService {
    private _testRepository: Repository<Test>

    public constructor() {
        this._testRepository = AppDataSource.getRepository(Test)
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
}
