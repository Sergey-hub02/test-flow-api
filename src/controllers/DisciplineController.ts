import type { RequestHandler } from 'express'
import type { UploadedFile } from 'express-fileupload'
import path from 'path'

import DisciplineService from '../services/DisciplineService.js'
import Discipline from '../entities/Discipline.js'

export default class DisciplineController {
    private _disciplineService: DisciplineService

    public constructor(disciplineService: DisciplineService) {
        this._disciplineService = disciplineService
    }

    public createDiscipline: RequestHandler = async (req, res) => {
        const name = req.body!.name
        const description = req.body!.description
        const discipline = new Discipline()

        discipline.name = name
        discipline.description = description

        try {
            const addedDiscipline = await this._disciplineService.create(discipline)
            return res.status(201).json({ disciplineGuid: addedDiscipline.guid })
        }
        catch (error) {
            return res.status(500).json({ error: (error as Error).message })
        }
    }

    public getAllDisciplines: RequestHandler = async (_, res) => {
        const disciplines = await this._disciplineService.readAll()
        return res.status(200).json(disciplines)
    }

    public getDiscipline: RequestHandler = async (req, res) => {
        const guid = req.params.guid as string
        const discipline = await this._disciplineService.readOne(guid)

        if (!discipline) {
            return res.status(404).json({ error: `Дисциплина с guid = ${guid} не найдена!`})
        }

        return res.status(200).json(discipline)
    }

    public getAvailableDisciplines: RequestHandler = async (req, res) => {
        const userGuid = req.params.userGuid as string
        const disciplines = await this._disciplineService.readAvailable(userGuid)
        return res.status(200).json(disciplines)
    }

    public updateDiscipline: RequestHandler = async (req, res) => {
        const guid = req.params.guid as string
        const name = req.body?.name
        const description = req.body?.description

        const discipline = new Discipline()
        discipline.guid = guid

        if (name) {
            discipline.name = name
        }
        if (description) {
            discipline.description = description
        }

        try {
            await this._disciplineService.update(guid, discipline)
            return res.status(200).json({ message: 'Обновление дисциплины прошло успешно!' })
        }
        catch (error) {
            return res.status(500).json({ error: (error as Error).message })
        }
    }

    public uploadDisciplinePhoto: RequestHandler = async (req, res) => {
        const guid = req.params.guid as string
        const photo = req.files!.photo as UploadedFile

        const discipline = await this._disciplineService.readOne(guid)

        if (!discipline) {
            return res.status(404).json({ error: `Не удалось найти дисциплину с guid = ${guid}` })
        }

        const uploadPath = `/upload/disciplines/${guid}/${photo.name}`
        const uploadPathFull = path.join(process.cwd(), 'dist', uploadPath)

        photo.mv(uploadPathFull, err => {
            if (err) {
                return res.status(500).json({ error: err })
            }

            return
        })

        const newDiscipline = new Discipline()
        newDiscipline.photo = uploadPath

        try {
            const updatedDiscipline = await this._disciplineService.update(guid, newDiscipline)
            return res.status(200).json(updatedDiscipline)
        }
        catch (error) {
            return res.status(500).json({ error: (error as Error).message })
        }
    }
}
