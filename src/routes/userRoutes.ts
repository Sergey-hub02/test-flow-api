import { Router } from 'express'
import { validateRegisterFields, validateBeforeUpdate } from '../middleware/userValidation.js'
import UserController from '../controllers/UserController.js'

const userRoutes = (controller: UserController) => {
    const router = Router()

    router.post('/', validateRegisterFields, controller.register)
    router.get('/', controller.getAllUsers)
    router.get('/:guid', controller.getUser)
    router.patch('/:guid', validateBeforeUpdate, controller.updateUser)

    return router
}

export default userRoutes
