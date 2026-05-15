import { Router } from 'express'
import RoleController from '../controllers/RoleController.js'

const roleRoutes = (controller: RoleController) => {
    const router = Router()

    router.get('/', controller.getAllRoles)
    router.get('/:roleCode', controller.getRoleByCode)

    return router
}

export default roleRoutes
