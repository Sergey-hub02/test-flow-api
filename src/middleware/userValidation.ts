import type { RequestHandler } from 'express'
import { validateEmail } from '../utils/functions.js'

export const validateRegisterFields: RequestHandler = (req, res, next) => {
    const lastName = req.body?.lastName
    const firstName = req.body?.firstName
    const login = req.body?.login
    const password = req.body?.password
    const confirmPassword = req.body?.confirmPassword
    const birthday = req.body?.birthday

    const errors = []

    if (!lastName) {
        errors.push('Не указана фамилия!')
    }
    if (!firstName) {
        errors.push('Не указано имя!')
    }

    if (!login) {
        errors.push('Не указан логин!')
    }
    else if (!validateEmail(login)) {
        errors.push('Некорректный адрес электронной почты!')
    }

    if (!password) {
        errors.push('Не указан пароль!')
    }
    else if (password.length < 8 || password.length > 20) {
        errors.push('Пароль должен содержать от 8 до 20 символов!')
    }
    else if (password !== confirmPassword) {
        errors.push('Пароли не совпадают!')
    }

    if (!birthday) {
        errors.push('Не указана дата рождения!')
    }
    else if (isNaN(Date.parse(birthday))) {
        errors.push('Некорректная дата рождения!')
    }

    if (errors.length > 0) {
        return res.status(400).json({
            errors: errors,
        })
    }

    next()
    return
}

export const validateLogin: RequestHandler = (req, res, next) => {
    const login = req.body?.login
    const password = req.body?.password

    const errors = []

    if (!login) {
        errors.push('Не указан логин!')
    }
    if (!password) {
        errors.push('Не указан пароль!')
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors: errors })
    }

    next()
    return
}

export const validateBeforeUpdate: RequestHandler = (req, res, next) => {
    const password = req.body?.password
    const errors = []

    if (password && (password.length < 8 || password.length > 20)) {
        errors.push('Пароль должен содержать от 8 до 20 символов!')
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors: errors })
    }

    next()
    return
}

export const validateUserRole: (role: string) => RequestHandler = (role: string) => {
    return (_, res, next) => {
        const userRole = res.locals.user?.role

        if (!userRole) {
            return res.status(403).json({ error: 'Доступ запрещён! Не удалось определить роль!' })
        }

        if (userRole === role) {
            next()
            return
        }

        return res.status(403).json({ error: 'Доступ запрещён! Вы не можете выполнить этот запрос!' })
    }
}
