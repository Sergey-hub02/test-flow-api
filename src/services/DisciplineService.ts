import type { Repository } from 'typeorm'

import Discipline from '../entities/Discipline.js'
import AppDataSource from '../config/database.js'

export default class DisciplineService {
    private _disciplineRepository: Repository<Discipline>

    public constructor() {
        this._disciplineRepository = AppDataSource.getRepository(Discipline)
    }

    public create = async (discipline: Discipline) => {
        const existingDiscipline = await this._disciplineRepository.existsBy({ name: discipline.name })

        if (existingDiscipline) {
            throw new Error(`Дисциплина с названием "${discipline.name}" уже есть в БД!`)
        }

        const result = await this._disciplineRepository.save(discipline)
        return result
    }

    public readAll = async () => {
        const result = await this._disciplineRepository.find({
            select: {
                guid: true,
                photo: true,
                name: true,
                description: true,
            },
            order: { createdAt: 'DESC' }
        })

        return result
    }

    public readOne = async (guid: string) => {
        const discipline = await this._disciplineRepository.findOne({
            where: { guid: guid },
            relations: ['tests', 'users', 'users.role'],
        })
        return discipline
    }

    public readAvailable = async (userGuid: string) => {
        const disciplines = await this._disciplineRepository
            .createQueryBuilder('d')
            .select(['d.guid', 'd.photo', 'd.name', 'd.description'])
            .where(qb => {
                const subQuery = qb
                    .subQuery()
                    .select('udd.disciplineGuid')
                    .from('user_disciplines_discipline', 'udd')
                    .where('udd.userGuid = :userGuid', { userGuid })
                    .getQuery()

                return 'd.guid NOT IN ' + subQuery
            })
            .getMany()

        return disciplines
    }

    public getTests = async (guid: string) => {
        const discipline = await this._disciplineRepository.findOne({
            select: {
                tests: {
                    guid: true,
                    name: true,
                },
            },
            where: { guid: guid },
            relations: { tests: true },
        })

        if (!discipline) {
            throw new Error(`Дисциплина с guid = ${guid} не существуте!`)
        }

        return discipline.tests
    }

    public update = async (guid: string, discipline: Discipline) => {
        const existingDiscipline = await this._disciplineRepository.existsBy({ guid })

        if (!existingDiscipline) {
            throw new Error(`Ошибка при обновлении! Дисциплина с guid = ${guid} не существует!`)
        }

        await this._disciplineRepository.update(guid, discipline)

        return await this._disciplineRepository.findOneBy({ guid })
    }
}
