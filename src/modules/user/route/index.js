import { Router } from 'express'

import controller from '../controller'
import { authorize, authenticate, validate } from '../../../middlewares'

import {
  UpdateProfileRequestBody,
  RegisterRoadmapRequestBody,
  UpdateRoadmapProgressRequestBody,
  ChangePasswordRequestBody,
} from '../schema'

const router = Router()

router.use(authenticate('jwt'))

router
  .route('/profile')
  .get(authorize(), controller.getProfile)
  .put(
    authorize(),
    validate(UpdateProfileRequestBody, 'body'),
    controller.updateProfile
  )

router
  .route('/registered-roadmaps')
  .get(authorize(), controller.getAllRegisteredRoadmap)
  .post(
    authorize(),
    validate(RegisterRoadmapRequestBody, 'body'),
    controller.registerRoadmap
  )

router
  .route('/registered-roadmaps/:roadmapId')
  .get(authorize(), controller.getRoadmapProgress)
  .put(
    authorize(),
    validate(UpdateRoadmapProgressRequestBody, 'body'),
    controller.updateRoadmapProgress
  )
  .delete(authorize(), controller.unregisterRoadmap)

router
  .route('/change-password')
  .post(
    authorize(),
    validate(ChangePasswordRequestBody, 'body'),
    controller.changePassword
  )

export default router
