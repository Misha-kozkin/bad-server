import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import {
    getCurrentUser,
    getCurrentUserRoles,
    login,
    logout,
    refreshAccessToken,
    register,
    updateCurrentUser,
} from '../controllers/auth'
import auth from '../middlewares/auth'
import verifyCsrf from '../middlewares/csrf'

const authRouter = Router()

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 20, // 20 попыток логина/регистрации за 15 минут с одного IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Слишком много попыток входа, попробуйте позже' },
})


authRouter.get('/user', auth, getCurrentUser)
authRouter.patch('/me', auth, updateCurrentUser)
authRouter.get('/user/roles', auth, getCurrentUserRoles)
authRouter.post('/login', authLimiter, login)
authRouter.get('/token', verifyCsrf, refreshAccessToken)
authRouter.get('/logout', verifyCsrf, logout)
authRouter.post('/register', authLimiter, register)


export default authRouter
