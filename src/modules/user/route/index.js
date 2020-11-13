import { Router } from 'express'

import controller from '../controller'
import {
  UpdateProfileRequestBody,
  ChangePasswordRequestBody,
  MarkAsReadRequestBody,
  RegisterCourseRequestBody,
} from '../schema'
import { authorize, authenticate, validate } from '../../../middlewares'
import { Roles } from '../../user/model'

const router = Router()

router.use(authenticate('jwt'))

router
  .route('/profile')
  .get(authorize([...Object.values(Roles)]), controller.getProfile)
  .put(
    authorize([...Object.values(Roles)]),
    validate(UpdateProfileRequestBody, 'body'),
    controller.updateProfile
  )

router
  .route('/course')
  .get(authorize([Roles.User]), controller.getAllRegisteredCourses)
  .post(
    authorize([Roles.User]),
    validate(RegisterCourseRequestBody, 'body'),
    controller.registerCourse
  )

router
  .route('/course/:courseId')
  .get(authorize([Roles.User]), controller.getRegisteredCourse)
  .put(
    authorize([Roles.User]),
    validate(MarkAsReadRequestBody, 'body'),
    controller.markAsRead
  )

router
  .route('/change-password')
  .post(
    authorize([...Object.values(Roles)]),
    validate(ChangePasswordRequestBody, 'body'),
    controller.changePassword
  )

export default router
