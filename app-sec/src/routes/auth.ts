import { Router } from 'express'
import { controller, validator } from '@/middlewares'
import User from '@/model/user'
import LoginForm from '@/forms/auth/login'
import RegistrationForm from '@/forms/auth/registration'
import { accessTokenAuth, loginAuth, refreshTokenAuth } from '@/middlewares/auth'

const router = Router()

router.post('/auth/register',
    validator(RegistrationForm),
    controller(async (req, res) => {
        const { password, ...rest } = req.body
        const user = new User(rest)
        await User.register(user, password)
        res.status(201).send({})
    })
)

router.post('/auth/login',
    validator(LoginForm),
    loginAuth,
    controller(async (req, res) => {
        const user: any = req.user
        const accessToken = user.generateAccessToken()
        const refreshToken = await user.createRefreshToken()

        res.status(200).send({ accessToken, refreshToken })
    })
)

router.get('/auth/refresh',
    refreshTokenAuth,
    controller(async (req, res) => {
        const user: any = req.user
        const accessToken = user.generateAccessToken()
        const refreshToken = await user.createRefreshToken()

        res.status(200).send({ accessToken, refreshToken })
    })
)

router.get('/auth/test',
    accessTokenAuth,
    controller(async (req, res) => {
        res.status(200).send({ message: 'Authenticated correctly ;)' })
    })
)

router.get('/auth/logout',
    refreshTokenAuth,
    controller(async (req, res) => {
        res.status(200).send({})
    })
)

export default router
