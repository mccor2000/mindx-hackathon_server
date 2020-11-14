import { Router } from 'express'

import controller from '../controller'
import { authorize, authenticate } from '../../../middlewares'

const router = Router()

router.use(authenticate('jwt'))

router
  .route('/profile')
  .get(authorize(), controller.getProfile)
  .put(authorize(), controller.updateProfile)

router
  .route('/registered-roadmaps')
  .get(authorize(), controller.getAllRegisteredRoadmap)
  .post(authorize(), controller.registerRoadmap)

router
  .route('/registered-roadmaps/:roadmapId')
  .get(authorize(), controller.getRoadmapProgress)
  .put(authorize(), controller.updateRoadmapProgress)
  .delete(authorize(), controller.unregisterRoadmap)

router.route('/change-password').post(authorize(), controller.changePassword)

export default router
