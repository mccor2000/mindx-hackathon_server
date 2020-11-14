import { Router } from 'express'

import controller from '../controller'
import { authorize, authenticate } from '../../../middlewares'

const router = Router()

router.use(authenticate('jwt'))

router
  .route('/')
  .get(authorize(), controller.getManyRooms)
  .post(authorize(), controller.createRoom)

router
  .route('/:roomId')
  .get(authorize(), controller.getRoomById)
  .put(authorize(), controller.updateRoomById)
  .delete(authorize(), controller.deleteRoomById)

export default router
