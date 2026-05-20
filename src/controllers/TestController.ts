import type { RequestHandler } from 'express'
import Discipline from '../entities/Discipline.js'
import User from '../entities/User.js'
import Test from '../entities/Test.js'
import Problem from '../entities/Problem.js'
import SingleAnswerTask from '../entities/SingleAnswerTask.js'
import MultipleAnswersTask from '../entities/MultipleAnswersTask.js'
import TextAnswerTask from '../entities/TextAnswerTask.js'
import AnswerVariant from '../entities/AnswerVariant.js'
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
        const problems = req.body!.problems

        const test = new Test()

        test.name = name
        test.description = description
        test.attemptsLimit = attemptsLimit
        test.duration = duration

        test.discipline = new Discipline()
        test.discipline.guid = discGuid

        test.author = new User()
        test.author.guid = userGuid

        test.problems = problems.map((problemData: any) => {
            const problem = new Problem()

            problem.wording = problemData.wording
            problem.test = test

            problem.tasks = problemData.tasks.map((taskData: any) => {
                let task

                switch (taskData.type) {
                    case 'SingleAnswerTask':
                    default:
                        task = new SingleAnswerTask()
                        break

                    case 'MultipleAnswersTask':
                        task = new MultipleAnswersTask()
                        break

                    case 'TextAnswerTask':
                        task = new TextAnswerTask()
                        task.correctText = taskData.correctText
                        break
                }

                task.wording = taskData.wording
                task.problem = problem

                if (taskData.variants && taskData.variants.length > 0) {
                    task.variants = taskData.variants.map((variantData: any) => {
                        const variant = new AnswerVariant()

                        variant.wording = variantData.wording
                        variant.task = task
                        variant.correct = variantData.correct

                        return variant
                    })
                }

                return task
            })

            return problem
        })

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

    public getTest: RequestHandler = async (req, res) => {
        const guid = req.params.guid as string
        const test = await this._testService.readOne(guid)

        if (!test) {
            return res.status(404).json({ error: `Тест с guid = ${guid} не существует!` })
        }

        return res.status(200).json(test)
    }
}
