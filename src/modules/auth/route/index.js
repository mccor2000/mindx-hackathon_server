import { Router } from 'express'
import controller from '../controller'

import { LoginRequestBody, SignupRequestBody } from '../schema'
import { validate } from '../../../middlewares'

const router = Router()

router.post('/signup', validate(SignupRequestBody, 'body'), controller.signup)
router.post('/login', validate(LoginRequestBody, 'body'), controller.login)

export default router
