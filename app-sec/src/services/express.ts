import express from 'express'
import cors from 'cors'
import routes from '@/routes'
import { notFoundRoute, jsonParsingError } from '@/middlewares/error'

export default async () => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(jsonParsingError)
    app.use(await routes())
    app.use(notFoundRoute)

    return app
}
