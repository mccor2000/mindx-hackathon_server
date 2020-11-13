import { Router } from 'express'

import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import authRouter from './modules/auth/route'
import userRouter from './modules/user/route'
import config from './app.config'

const router = Router()

const specs = swaggerJSDoc(config.swagger)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))

router.use('/auth', authRouter)
router.use('/user', userRouter)

export default router
