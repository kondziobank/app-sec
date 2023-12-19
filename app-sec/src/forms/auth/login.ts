import { body } from 'express-validator'
import config from '@/config'

export default [
    body('email')
        .exists().withMessage('Field is required').bail()
        .isString().withMessage('Field have to be a string').bail()
        .trim()
        .notEmpty().withMessage('Field must not be empty').bail()
        .isEmail().withMessage('Field must contain a valid email'),
    
    body('password')
        .exists().withMessage('Field is required').bail()
        .isString().withMessage('Field have to be a string').bail()
        .isStrongPassword(config.passwordPolicy).withMessage('Password is not strong enough'),
]
