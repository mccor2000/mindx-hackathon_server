import { Router } from 'express'

import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import authRouter from './modules/auth/route'
import userRouter from './modules/user/route'
import { roadmapRouter, nodeRouter } from './modules/roadmap/route'

import config from './app.config'

const router = Router()

const specs = swaggerJSDoc(config.swagger)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/roadmaps', roadmapRouter)
router.use('/nodes', nodeRouter)

export default router
