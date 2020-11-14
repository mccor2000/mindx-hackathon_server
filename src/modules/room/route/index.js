import { Router } from 'express'

import controller from '../controller'
import { authorize, authenticate, validate } from '../../../middlewares'
import { CreateRoomRequestBody, UpdateRoomRequestBody } from '../schema'

const router = Router()

router.use(authenticate('jwt'))

router
  .route('/')
  .get(authorize(), controller.getManyRooms)
  .post(
    authorize(),
    validate(CreateRoomRequestBody, 'body'),
    controller.createRoom
  )

router
  .route('/:roomId')
  .get(authorize(), controller.getRoomById)
  .put(
    authorize(),
    validate(UpdateRoomRequestBody, 'body'),
    controller.updateRoomById
  )
  .delete(authorize(), controller.deleteRoomById)

export default router
