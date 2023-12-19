import 'dotenv/config'
import database from '@/services/database'
import express from '@/services/express'
import passport from '@/services/passport'

(async () => {
    await database()
    const app = await express()
    passport()

    app.listen(process.env.PORT, () => console.log('Server running'))
})()
