import { Router } from 'express'

import controller from '../controller'
import { authenticate, authorize, validate } from '../../../middlewares'

import {
  CreateRoadmapRequestBody,
  UpdateRoadmapRequestBody,
  AddNodeToRoadMapRequestBody,
  UpdateNodeByIdRequestBody,
} from '../schema'

export const roadmapRouter = Router()
export const nodeRouter = Router()

roadmapRouter.use(authenticate('jwt'))
nodeRouter.use(authenticate('jwt'))

roadmapRouter
  .route('/')
  .get(authorize(), controller.getManyRoadmaps)
  .post(
    authorize('contributor'),
    validate(CreateRoadmapRequestBody, 'body'),
    controller.createRoadmap
  )

roadmapRouter
  .route('/:roadmapId')
  .get(authorize(), controller.getRoadmapById)
  .put(
    authorize('contributor'),
    validate(UpdateRoadmapRequestBody, 'body'),
    controller.updateRoadmapById
  )
  .delete(authorize('contributor'), controller.deleteRoadmapById)

roadmapRouter
  .route('/:roadmapId/nodes')
  .get(authorize(), controller.getAllNodesFromRoadmap)
  .post(
    authorize('contributor'),
    validate(AddNodeToRoadMapRequestBody, 'body'),
    controller.addNodeToRoadMap
  )

roadmapRouter
  .route('/:roadmapId/nodes/:nodeId')
  .delete(authorize('contributor'), controller.removeNodeFromRoadmap)

nodeRouter.route('/').post(authorize('contributor'), controller.createNode)

nodeRouter
  .route('/:nodeId')
  .get(authorize(), controller.getNodeById)
  .put(
    authorize('contributor'),
    validate(UpdateNodeByIdRequestBody, 'body'),
    controller.updateNodeById
  )
