import { ErrorRequestHandler } from 'express'
import multer from 'multer'

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).send({ message: `Ошибка загрузки файла: ${err.message}` })
        return next()
    }
    const statusCode = err.statusCode || 500
    const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message
    console.log(err)
    res.status(statusCode).send({ message })
    next()
}

export default errorHandler
