import type { Request, Response } from 'express'
import User from '../entities/User.js'
import UserService from '../services/UserService.js'

export default class UserController {
    private _userService: UserService

    public constructor(userService: UserService) {
        this._userService = userService
    }

    public register = async (req: Request, res: Response) => {
        const {
            lastName,
            firstName,
            secondName,
            login,
            password,
            birthday
        } = req.body

        const user = new User()

        user.lastName = lastName
        user.firstName = firstName
        user.secondName = secondName
        user.login = login
        user.password = password
        user.birthday = new Date(birthday)

        try {
            const userGuid = await this._userService.create(user)
            return res.status(201).json({ userGuid: userGuid })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    public getAllUsers = async (_: Request, res: Response) => {
        const users = await this._userService.readAll()
        return res.status(200).json(users)
    }

    public getUser = async (req: Request, res: Response) => {
        const guid = req.params.guid as string
        const user = await this._userService.readOne(guid)

        if (!user) {
            return res.status(404).json({ error: `Пользователь с guid = ${guid} не найден!` })
        }

        return res.status(200).json(user)
    }

    public updateUser = async (req: Request, res: Response) => {
        const guid = req.params.guid as string
        const lastName = req.body?.lastName
        const firstName = req.body?.firstName
        const secondName = req.body?.secondName
        const password = req.body?.password
        const birthday = req.body?.birthday

        const user = new User()

        if (lastName) {
            user.lastName = lastName
        }
        if (firstName) {
            user.firstName = firstName
        }
        if (secondName) {
            user.secondName = secondName
        }
        if (password) {
            user.password = password
        }
        if (birthday) {
            user.birthday = new Date(birthday)
        }

        try {
            await this._userService.update(guid, user)
            return res.status(200).json({ message: 'Обновление прошло успешно!' })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }
}
