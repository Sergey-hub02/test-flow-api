import type { Request, Response } from 'express'
import type { Repository } from 'typeorm'

import Role from '../entities/Role.js'
import AppDataSource from '../config/database.js'

export default class RoleController {
    private _roleRepository: Repository<Role>

    public constructor() {
        this._roleRepository = AppDataSource.getRepository(Role)
    }

    public getAllRoles = async (_: Request, res: Response) => {
        const result = await this._roleRepository.find()
        return res.status(200).json(result)
    }

    public getRoleByCode = async (req: Request, res: Response) => {
        const code = req.params.roleCode as string
        const role = await this._roleRepository.findOneBy({ code: code })

        if (!role) {
            return res.status(404).json({ error: `Не удалось найти роль с кодом ${code}` })
        }

        return res.status(200).json(role)
    }
}
