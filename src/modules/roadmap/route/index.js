import { Router } from 'express'

import controller from '../controller'
import { authenticate, authorize, validate } from '../../../middlewares'

const router = Router()

router.use(authenticate('jwt'))

router
  .route('/')
  .get(authorize([]), () => {})
  .post(authorize([]), validate(), () => {})

router
  .route('/:roadmapId')
  .get(authorize([]), () => {})
  .put(authorize([]), validate(), () => {})
  .delete(authorize([]), () => {})

router
  .route('/:roadmapId/nodes')
  .get(authorize([]), () => {})
  .post(authorize([]), validate(), () => {})

router
  .route('/:roadmapId/nodes/:nodeId')
  .get(authorize([]), () => {})
  .put(authorize([]), validate(), () => {})
  .delete(authorize([]), () => {})

export default router
