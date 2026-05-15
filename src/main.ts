import express from 'express'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'

import AppDataSource from './config/database.js'

import roleRoutes from './routes/roleRoutes.js'
import RoleController from './controllers/RoleController.js'

import userRoutes from './routes/userRoutes.js'
import UserController from './controllers/UserController.js'
import UserService from './services/UserService.js'
import TokenService from './services/TokenService.js'

import fileUploadConfig from './config/fileUpload.js'

dotenv.config()

const main = async () => {
    try {
        await AppDataSource.initialize()
        console.log('Подключение к БД прошло успешно!')
    }
    catch (error) {
        console.error(`Не удалось подключиться к БД!`)
        console.error(error)
        process.exit(1)
    }

    const PORT = process.env.APP_PORT
    const app = express()

    const userService = new UserService()
    const tokenService = new TokenService()
    const userController = new UserController(userService, tokenService)

    const roleController = new RoleController()

    app.use(express.json())
    app.use(fileUpload(fileUploadConfig))

    app.use('/api/v1/users', userRoutes(userController))
    app.use('/api/v1/roles', roleRoutes(roleController))

    app.listen(PORT, () => {
        console.log(`Приложение запущено на порте ${PORT}`)
    })
}

main()
    .catch(error => {
        console.error(error.message)
    })
