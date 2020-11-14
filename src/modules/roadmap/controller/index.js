import service from '../service'
import { wrap } from '../../../utils'

const getManyRoadmaps = async (_, res) => {
  const roadmaps = await service.getManyRoadmaps()

  res.status(200).json({ data: roadmaps })
}

const createRoadmap = async (req, res) => {
  const newRoadmap = await service.createRoadmap(req.body)

  res.status(201).json({ data: newRoadmap })
}

const getRoadmapById = async (req, res) => {
  const roadmap = await service.getRoadmapById(req.params.roadmapId)

  res.status(200).json({ data: roadmap })
}

const updateRoadmapById = async (req, res) => {
  const updatedRoadmap = await service.updateRoadmapById(
    req.params.roadmapId,
    req.body
  )

  res.status(200).json({ data: updatedRoadmap })
}

const deleteRoadmapById = async (req, res) => {
  await service.removeRoadmapById(req.params.roadmapId)

  res.status(204).end()
}

const getAllNodesFromRoadmap = async (req, res) => {
  const nodesBelongToRoadmap = await service.getAllNodesInRoadmapById(
    req.params.roadmapId
  )

  res.status(200).json({ data: nodesBelongToRoadmap })
}

const addNodeToRoadMap = async (req, res) => {
  await service.addNodeToRoadMap(req.params.roadmapId, req.body)

  res.status(201).end()
}

const createNode = async (req, res) => {
  const newNode = await service.createNode(req.body)

  res.status(201).json({ data: newNode })
}

const getNodeById = async (req, res) => {
  const node = await service.getNodeById(req.params.nodeId)

  res.status(200).json({ data: node })
}

const updateNodeById = async (req, res) => {
  const updatedNode = await service.updateNodeById(req.params.nodeId, req.body)

  res.status(200).json({ data: updatedNode })
}

const removeNodeFromRoadmap = async (req, res) => {
  await service.removeNodeFromRoadmap(req.params.roadmapId, req.params.nodeId)

  res.status(204).end()
}
export default {
  getManyRoadmaps: wrap(getManyRoadmaps),
  createRoadmap: wrap(createRoadmap),
  getRoadmapById: wrap(getRoadmapById),
  updateRoadmapById: wrap(updateRoadmapById),
  deleteRoadmapById: wrap(deleteRoadmapById),

  getAllNodesFromRoadmap: wrap(getAllNodesFromRoadmap),
  addNodeToRoadMap: wrap(addNodeToRoadMap),
  removeNodeFromRoadmap: wrap(removeNodeFromRoadmap),

  createNode: wrap(createNode),
  getNodeById: wrap(getNodeById),
  updateNodeById: wrap(updateNodeById),
}
