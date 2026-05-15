import { hash } from 'argon2'
import AppDataSource from '../config/database.js'
import User from '../entities/User.js'
import Role from '../entities/Role.js'

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
        return savedUser.guid
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
            relations: { role: true },
        })
        return result
    }

    public update = async (guid: string, user: User) => {
        const existingUser = await this._userRepository.existsBy({ guid })

        if (!existingUser) {
            throw new Error(`Ошибка при обновлении! Пользователь с guid = ${guid} не существует!`)
        }

        const result = await this._userRepository.update(guid, user)
        return result.affected
    }
}
