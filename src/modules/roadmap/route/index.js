import { Router } from 'express'

import { authenticate } from '../../../middlewares'

const router = Router()

router.use(authenticate('jwt'))

export default router
