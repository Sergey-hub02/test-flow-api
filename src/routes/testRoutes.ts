import { Router } from 'express'
import TestController from '../controllers/TestController.js'

const testRoutes = (controller: TestController) => {
    const router = Router()

    router.post('/', controller.createTest)
    router.get('/', controller.getAllTests)
    router.get('/:guid', controller.getTest)

    return router
}

export default testRoutes
