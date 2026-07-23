import { NextFunction, Request, Response } from 'express'
import { CSRF_COOKIE_NAME } from '../config'
import ForbiddenError from '../errors/forbidden-error'

export default function verifyCsrf(req: Request, _res: Response, next: NextFunction) {
    const cookieToken = req.cookies[CSRF_COOKIE_NAME]
    const headerToken = req.header('x-csrf-token')

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
        return next(new ForbiddenError('Невалидный CSRF-токен'))
    }
    return next()
}