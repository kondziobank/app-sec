import { Request, Response, Handler, NextFunction } from 'express'
import logger from '@/services/logger';

export function notFoundRoute(_req: Request, res: Response) {
    res.status(404).send({
        message: 'Unknown route'
    })
}

export function jsonParsingError(err: SyntaxError, _req: Request, res: Response, next: NextFunction) {
    if ((err as any).status === 400 && 'body' in err) {
        return res.status(400).send({ message: "JSON parsing error" })
    }

    next()
}

export function catchExceptions(middleware: Handler): Handler {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next)
        } catch (e) {
            logger.error(e)
            res.status(500).send({ message: 'Internal error' })
        }
    }
}
