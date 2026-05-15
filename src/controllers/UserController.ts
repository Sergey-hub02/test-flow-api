import type { RequestHandler } from 'express'
import { verify } from 'argon2'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../entities/User.js'
import UserService from '../services/UserService.js'

import Token from '../entities/Token.js'
import TokenService from '../services/TokenService.js'

dotenv.config()

export default class UserController {
    private _userService: UserService
    private _tokenService: TokenService

    public constructor(userService: UserService, tokenService: TokenService) {
        this._userService = userService
        this._tokenService = tokenService
    }

    public register: RequestHandler = async (req, res) => {
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
        catch (error: any) {
            return res.status(500).json({ errors: [error.message] })
        }
    }

    public login: RequestHandler = async (req, res) => {
        const { login, password } = req.body
        const foundUser = await this._userService.readByLogin(login)

        if (!foundUser) {
            return res.status(403).json({ errors: ['Неправильный логин или пароль!'] })
        }

        const hashedPassword = foundUser.password

        if (!(await verify(hashedPassword, password))) {
            return res.status(403).json({ errors: ['Неправильный логин или пароль!'] })
        }

        const payload: JwtPayload = {
            sub: foundUser.guid,
            photo: foundUser.photo,
            lastName: foundUser.lastName,
            firstName: foundUser.firstName,
            secondName: foundUser.secondName,
            birthday: foundUser.birthday,
            role: foundUser.role.code,
        }

        const accessExpiresAt = new Date()
        accessExpiresAt.setDate(accessExpiresAt.getDate() + 1)

        const refreshExpiresAt = new Date()
        refreshExpiresAt.setMonth(refreshExpiresAt.getMonth() + 2)

        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_PRIVATE_KEY as string,
            { expiresIn: accessExpiresAt.getSeconds() }
        )

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_PRIVATE_KEY as string,
            { expiresIn: refreshExpiresAt.getSeconds() }
        )

        const token = new Token()

        token.user = foundUser
        token.accessToken = accessToken
        token.expiresAt = accessExpiresAt
        token.refreshToken = refreshToken
        token.refreshExpiresAt = refreshExpiresAt

        try {
            const newToken = await this._tokenService.create(token)
            return res.status(200).json(newToken)
        }
        catch (error: any) {
            return res.status(500).json({ errors: [error.message] })
        }
    }

    public getAllUsers: RequestHandler = async (_, res) => {
        const users = await this._userService.readAll()
        return res.status(200).json(users)
    }

    public getUser: RequestHandler = async (req, res) => {
        const guid = req.params.guid as string
        const user = await this._userService.readOne(guid)

        if (!user) {
            return res.status(404).json({ error: `Пользователь с guid = ${guid} не найден!` })
        }

        return res.status(200).json(user)
    }

    public updateUser: RequestHandler = async (req, res) => {
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
        catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }
}
