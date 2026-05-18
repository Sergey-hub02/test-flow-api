import { hash } from 'argon2'
import AppDataSource from '../config/database.js'
import User from '../entities/User.js'
import Role from '../entities/Role.js'
import Discipline from '../entities/Discipline.js'

export default class UserService {
    private _userRepository = AppDataSource.getRepository(User)
    private _roleRepository = AppDataSource.getRepository(Role)

    public create = async (user: User) => {
        let result = await this._userRepository.findOneBy({ login: user.login })

        if (result) {
            throw new Error('Пользователь с таким логином уже зарегистрирован в системе!')
        }

        const studentRole = await this._roleRepository.findOneBy({ code: 'student' })

        if (!studentRole) {
            throw new Error('Не удалось найти роль "Обучающийся"!')
        }

        const hashedPassword = await hash(user.password)

        const newUser = this._userRepository.create({
            lastName: user.lastName,
            firstName: user.firstName,
            secondName: user.secondName ?? '',
            login: user.login,
            password: hashedPassword,
            birthday: user.birthday,
            role: studentRole,
        })

        const savedUser = await this._userRepository.save(newUser)
        return savedUser
    }

    public readAll = async () => {
        const result = await this._userRepository.find({
            select: {
                guid: true,
                lastName: true,
                firstName: true,
                secondName: true,
                login: true,
                birthday: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
            order: { createdAt: 'DESC' },
            relations: { role: true },
        })

        return result
    }

    public readOne = async (guid: string) => {
        const result = await this._userRepository.findOne({
            where: { guid: guid },
            relations: { role: true, disciplines: true },
        })

        return result
    }

    public readByLogin = async (login: string) => {
        const result = await this._userRepository.findOne({
            select: {
                guid: true,
                photo: true,
                lastName: true,
                firstName: true,
                secondName: true,
                login: true,
                password: true,
                birthday: true,
                role: true,
            },
            where: { login: login },
            relations: { role: true },
        })

        return result
    }

    public update = async (guid: string, user: User) => {
        const existingUser = await this._userRepository.existsBy({ guid })

        if (!existingUser) {
            throw new Error(`Ошибка при обновлении! Пользователь с guid = ${guid} не существует!`)
        }

        await this._userRepository.update(guid, user)

        return await this._userRepository.findOne({
            where: { guid: guid },
            relations: { role: true, disciplines: true },
        })
    }

    public getDisciplines = async (guid: string) => {
        const user = await this._userRepository.findOne({
            where: { guid: guid },
            relations: { role: true, disciplines: true },
        })

        if (!user) {
            throw new Error(`Пользователь с guid = ${guid} не существует!`)
        }

        return user.disciplines
    }

    public addDiscipline = async (user: User, discipline: Discipline) => {
        const newUser = this._userRepository.create(user)
        newUser.disciplines.push(discipline)

        await this._userRepository.save(newUser)

        return await this._userRepository.findOne({
            where: { guid: user.guid },
            relations: { role: true, disciplines: true },
        })
    }

    public removeDiscipline = async (user: User, discipline: Discipline) => {
        const newUser = this._userRepository.create(user)
        newUser.disciplines = newUser.disciplines.filter(disc => disc.guid !== discipline.guid)

        await this._userRepository.save(newUser)

        return await this._userRepository.findOne({
            where: { guid: user.guid },
            relations: { role: true, disciplines: true },
        })
    }
}
