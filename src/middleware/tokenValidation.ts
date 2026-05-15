import type { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const validateToken: RequestHandler = (req, res, next) => {
    const authorization = req.header('Authorization')

    if (!authorization || !authorization.includes('Bearer')) {
        return res.status(403).json({ error: 'Доступ запрещён!' })
    }

    const [, token] = authorization.split(' ')

    if (!token) {
        return res.status(403).json({ error: 'Доступ запрещён!' })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_PRIVATE_KEY as string)
        res.locals.user = payload

        next()
        return
    }
    catch (error: any) {
        return res.status(500).json({ error: error.message })
    }
}
