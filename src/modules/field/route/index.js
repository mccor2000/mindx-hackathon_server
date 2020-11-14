import { Router } from 'express'

import controller from '../controller'
import { authenticate, validate } from '../../../middlewares'
import { CreateFieldRequestBody, UpdateFieldRequestBody } from '../schema'

const router = Router()

router.use(authenticate('jwt'))

router
  .route('/')
  .get(controller.getManyFields)
  .post(validate(CreateFieldRequestBody, 'body'), controller.createField)

router
  .route('/:fieldId')
  .get(controller.getFieldById)
  .put(validate(UpdateFieldRequestBody, 'body'), controller.updateFieldById)
  .delete(controller.deleteFieldById)

export default router
