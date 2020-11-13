import { Roadmap, Node } from '../model'
import { AppError, ErrorType } from '../../../utils'

const getManyRoadmaps = async (filter = {}) => {
  const roadmaps = await Roadmap.find(filter).lean().exec()

  return roadmaps
}

const createRoadmap = async (roadmapData = {}, userId) => {
  const existingRoadmap = await Roadmap.findOne({
    name: roadmapData.name,
    owner: userId,
  })
    .select('_id name')
    .lean()
    .exec()

  if (existingRoadmap)
    throw new AppError(
      ErrorType.BAD_REQUEST,
      `Roadmap ${existingRoadmap.name} is already exist in your repository`
    )

  const newRoadmap = await Roadmap.create(roadmapData)
  return { _id: newRoadmap.id }
}

const getRoadmapById = async (roadmapId) => {
  const existingRoadmap = await Roadmap.findById(roadmapId).lean().exec()

  if (!existingRoadmap)
    throw new AppError(ErrorType.BAD_REQUEST, `Roadmap does not exist`)

  return existingRoadmap
}

const getAllNodesInRoadmapById = async (roadmapId) => {
  const { content, links } = await getRoadmapById(roadmapId)
  const getAllNodes = content.map((nodeId) => Node.findById(nodeId))

  const nodes = await Promise.all(getAllNodes)
  return { nodes, links }
}

const updateRoadmapById = async (roadmapId, updateData) => {
  const existingRoadmap = await Roadmap.findByIdAndUpdate(roadmapId, updateData)
    .select('_id')
    .lean()
    .exec()

  if (!existingRoadmap)
    throw new AppError(ErrorType.BAD_REQUEST, `Roadmap does not exist`)

  return existingRoadmap
}

const removeRoadmapById = async (roadmapId) => {
  const removedRoadmap = await Roadmap.findOneAndRemove(roadmapId)
    .select('_id')
    .lean()
    .exec()

  if (!removedRoadmap)
    throw new AppError(ErrorType.BAD_REQUEST, `Roadmap does not exist`)

  return removedRoadmap
}

const addNodeToRoadMap = async (roadmapId, { nodeId, link }) => {
  const roadmap = await getRoadmapById(roadmapId)
  if (!roadmap.content.every((id) => id != nodeId))
    throw new AppError(ErrorType.BAD_REQUEST, `Node already exists in roadmap`)

  await Roadmap.findByIdAndUpdate(roadmapId, {
    $push: { content: nodeId, links: link },
  })
}

const removeNodeFromRoadmap = async (roadmapId, nodeId) => {
  const roadmap = await getRoadmapById(roadmapId)
  if (roadmap.content.every((id) => id != nodeId))
    throw new AppError(ErrorType.BAD_REQUEST, `Node does not exist in roadmap`)

  const removedNode = await deleteNodeById(nodeId)
  await Roadmap.findByIdAndUpdate(roadmapId, {
    $pull: { content: removedNode._id },
  })

  return removedNode
}

const getManyNodes = async (filter = {}) => {
  const nodes = await Node.find(filter).lean().exec()

  return nodes
}

const createNode = async (nodeData) => {
  const newNode = await Node.create(nodeData)

  return newNode
}

const getNodeById = async (nodeId) => {
  const existingNode = await Node.findById(nodeId).lean().exec()

  return existingNode
}

const updateNodeById = async (nodeId, updateData) => {
  const updatedNode = await Node.findByIdAndUpdate(nodeId, updateData)
    .select('_id')
    .lean()
    .exec()

  if (!updatedNode)
    throw new AppError(ErrorType.BAD_REQUEST, `Node does not exist`)

  return updatedNode
}

const deleteNodeById = async (nodeId) => {
  const removedNode = await Node.findByIdAndDelete(nodeId)
    .select('_id')
    .lean()
    .exec()

  if (!removedNode)
    throw new AppError(ErrorType.BAD_REQUEST, `Node does not exist`)

  return removedNode
}

export default {
  getManyRoadmaps,
  createRoadmap,
  getRoadmapById,
  updateRoadmapById,
  removeRoadmapById,

  getAllNodesInRoadmapById,
  addNodeToRoadMap,
  removeNodeFromRoadmap,

  getManyNodes,
  createNode,
  getNodeById,
  updateNodeById,
  deleteNodeById,
}
