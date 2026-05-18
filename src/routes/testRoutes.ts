import { Router } from 'express'
import TestController from '../controllers/TestController.js'

const testRoutes = (controller: TestController) => {
    const router = Router()

    router.post('/', controller.createTest)
    router.get('/', controller.getAllTests)

    return router
}

export default testRoutes
