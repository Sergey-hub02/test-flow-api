import { Router } from 'express'
import DisciplineController from '../controllers/DisciplineController.js'

const disciplineRoutes = (controller: DisciplineController) => {
    const router = Router()

    router.post('/', controller.createDiscipline)
    router.get('/', controller.getAllDisciplines)
    router.get('/:guid', controller.getDiscipline)
    router.get('/available/:userGuid', controller.getAvailableDisciplines)
    router.get('/:guid/tests', controller.getTests)
    router.patch('/:guid', controller.updateDiscipline)
    router.patch('/:guid/photo', controller.uploadDisciplinePhoto)

    return router
}

export default disciplineRoutes
