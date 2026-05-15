import { Router } from 'express'
import { validateRegisterFields, validateBeforeUpdate, validateLogin } from '../middleware/userValidation.js'
import UserController from '../controllers/UserController.js'

const userRoutes = (controller: UserController) => {
    const router = Router()

    router.post('/', validateRegisterFields, controller.register)
    router.post('/auth', validateLogin, controller.login)
    router.get('/', controller.getAllUsers)
    router.get('/:guid', controller.getUser)
    router.patch('/:guid', validateBeforeUpdate, controller.updateUser)
    router.patch('/:guid/photo', controller.updatePhoto)

    return router
}

export default userRoutes
