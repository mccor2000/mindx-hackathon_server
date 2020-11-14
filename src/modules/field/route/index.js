import { Router } from 'express'

import controller from '../controller'
import { authorize, authenticate, validate } from '../../../middlewares'
import { CreateFieldRequestBody, UpdateFieldRequestBody } from '../schema'

const router = Router()

router.use(authenticate('jwt'))

router
  .route('/')
  .get(authorize(), controller.getManyFields)
  .post(
    authorize('admin'),
    validate(CreateFieldRequestBody, 'body'),
    controller.createField
  )

router
  .route('/:fieldId')
  .get(authorize(), controller.getFieldById)
  .put(
    authorize('admin'),
    validate(UpdateFieldRequestBody, 'body'),
    controller.updateFieldById
  )
  .delete(authorize('admin'), controller.deleteFieldById)

export default router
