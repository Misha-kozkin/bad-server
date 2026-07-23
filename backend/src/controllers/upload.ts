import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import { promises as fs } from 'fs'
import sharp from 'sharp'
import BadRequestError from '../errors/bad-request-error'
import { MIN_FILE_SIZE } from '../middlewares/file'

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }
    try {
        if (req.file.size < MIN_FILE_SIZE) {
            await fs.unlink(req.file.path)
            return next(new BadRequestError('Файл слишком маленький'))
        }

        // проверяем, что это действительно изображение, а не файл с подделанным mimetype
        try {
            const metadata = await sharp(req.file.path).metadata()
            if (!metadata.format) {
                throw new Error('invalid image')
            }
        } catch {
            await fs.unlink(req.file.path)
            return next(new BadRequestError('Файл повреждён либо не является изображением'))
        }

        const fileName = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${req.file.filename}`
            : `/${req.file?.filename}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: req.file?.originalname,
        })
    } catch (error) {
        return next(error)
    }
}

export default {}
