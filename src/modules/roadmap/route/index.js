import { Router } from 'express'

import controller from '../controller'
import { authenticate, authorize } from '../../../middlewares'

export const roadmapRouter = Router()
export const nodeRouter = Router()

roadmapRouter.use(authenticate('jwt'))
nodeRouter.use(authenticate('jwt'))

roadmapRouter
  .route('/')
  .get(authorize(), controller.getManyRoadmaps)
  .post(authorize('contributor'), controller.createRoadmap)

roadmapRouter
  .route('/:roadmapId')
  .get(authorize(), controller.getRoadmapById)
  .put(authorize('contributor'), controller.updateRoadmapById)
  .delete(authorize('contributor'), controller.deleteRoadmapById)

roadmapRouter
  .route('/:roadmapId/nodes')
  .get(authorize(), controller.getAllNodesFromRoadmap)
  .post(authorize('contributor'), controller.addNodeToRoadMap)

roadmapRouter
  .route('/:roadmapId/nodes/:nodeId')
  .delete(authorize('contributor'), controller.removeNodeFromRoadmap)

nodeRouter.route('/').post(authorize('contributor'), controller.createNode)

nodeRouter
  .route('/:nodeId')
  .get(authorize(), controller.getNodeById)
  .put(authorize('contributor'), controller.updateNodeById)
