import type { RequestHandler } from 'express'
import Discipline from '../entities/Discipline.js'
import User from '../entities/User.js'
import Test from '../entities/Test.js'
import TestService from '../services/TestService.js'

export default class TestController {
    private _testService: TestService

    public constructor(testService: TestService) {
        this._testService = testService
    }

    public createTest: RequestHandler = async (req, res) => {
        const name = req.body!.name
        const description = req.body!.description
        const attemptsLimit = req.body!.attemptsLimit
        const duration = req.body!.duration
        const discGuid = req.body!.disciplineGuid
        const userGuid = req.body!.userGuid

        const test = new Test()

        test.name = name
        test.description = description
        test.attemptsLimit = attemptsLimit
        test.duration = duration

        test.discipline = new Discipline()
        test.discipline.guid = discGuid

        test.author = new User()
        test.author.guid = userGuid

        try {
            const addedTest = await this._testService.create(test)
            return res.status(201).json({ testGuid: addedTest.guid })
        }
        catch (error) {
            return res.status(500).json({ error: (error as Error).message })
        }
    }

    public getAllTests: RequestHandler = async (_, res) => {
        const tests = await this._testService.readAll()
        return res.status(200).json(tests)
    }
}
