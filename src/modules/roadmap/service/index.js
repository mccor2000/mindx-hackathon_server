import { Roadmap, Node } from '../model'
import { AppError, ErrorType } from '../../../utils'

const getManyRoadmaps = async (filter = {}) => {
  const roadmaps = await Roadmap.find(filter).lean().exec()

  return roadmaps
}

const createRoadmap = async (user, roadmapData = {}) => {
  const existingRoadmap = await Roadmap.findOne({
    name: roadmapData.name,
    owner: user._id,
  })
    .select('_id name')
    .lean()
    .exec()

  if (existingRoadmap)
    throw new AppError(
      ErrorType.BAD_REQUEST,
      `Roadmap ${existingRoadmap.name} is already exist in your repository`
    )

  const newRoadmap = await Roadmap.create({ ...roadmapData, owner: user._id })
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

const updateRoadmapById = async (user, roadmapId, updateData) => {
  const existingRoadmap = await Roadmap.findById(roadmapId)
    .select('owner')
    .lean()
    .exec()

  if (!existingRoadmap)
    throw new AppError(ErrorType.BAD_REQUEST, `Roadmap does not exist`)

  if (user._id !== existingRoadmap.owner)
    throw AppError(ErrorType.FORBIDDEN, 'Permision denied')

  return Roadmap.findByIdAndUpdate(roadmapId, updateData)
    .select('_id')
    .lean()
    .exec()
}

const removeRoadmapById = async (user, roadmapId) => {
  const existingRoadmap = await Roadmap.findOneAndRemove(roadmapId)
    .select('owner')
    .lean()
    .exec()

  if (!existingRoadmap)
    throw new AppError(ErrorType.BAD_REQUEST, `Roadmap does not exist`)

  if (user._id !== existingRoadmap.owner)
    throw AppError(ErrorType.FORBIDDEN, 'Permision denied')

  return Roadmap.findByIdAndDelete(roadmapId).select('_id').lean().exec()
}

const addNodeToRoadMap = async (user, roadmapId, { nodeId, parentId }) => {
  const roadmap = await getRoadmapById(roadmapId)

  if (user._id !== roadmap.owner)
    throw AppError(ErrorType.FORBIDDEN, 'Permision denied')

  if (!roadmap.content.every((id) => id != nodeId))
    throw new AppError(ErrorType.BAD_REQUEST, `Node already exists in roadmap`)

  await Roadmap.findByIdAndUpdate(roadmapId, {
    $push: {
      content: nodeId,
      links: { id: `e${parentId}-${nodeId}`, source: parentId, target: nodeId },
    },
  })

  await Node.findByIdAndUpdate(nodeId, { parent: parentId })
}

const removeNodeFromRoadmap = async (user, roadmapId, nodeId) => {
  const roadmap = await getRoadmapById(roadmapId)

  if (user._id !== roadmap.owner)
    throw AppError(ErrorType.FORBIDDEN, 'Permision denied')

  if (roadmap.content.every((id) => id != nodeId))
    throw new AppError(ErrorType.BAD_REQUEST, `Node does not exist in roadmap`)

  const removedNode = await deleteNodeById(nodeId)
  await Roadmap.findByIdAndUpdate(roadmapId, {
    $pull: { content: removedNode._id, links: { id: { $regex: `${nodeId}` } } },
  })

  return removedNode
}

const getManyNodes = async (filter = {}) => {
  const nodes = await Node.find(filter).lean().exec()

  return nodes
}

const createNode = async (user, nodeData) => {
  const newNode = await Node.create({ ...nodeData, owner: user._id })

  return newNode
}

const getNodeById = async (nodeId) => {
  const existingNode = await Node.findById(nodeId).lean().exec()

  return existingNode
}

const updateNodeById = async (user, nodeId, updateData) => {
  const existingNode = await Node.findById(nodeId).select('owner').lean().exec()

  if (!existingNode)
    throw new AppError(ErrorType.BAD_REQUEST, `Node does not exist`)

  if (user._id !== existingNode.owner)
    throw AppError(ErrorType.FORBIDDEN, 'Permision denied')

  return Node.findByIdAndUpdate(nodeId, updateData).select('_id').lean().exec()
}

const deleteNodeById = async (user, nodeId) => {
  const existingNode = await Node.findById(nodeId).select('owner').lean().exec()

  if (!existingNode)
    throw new AppError(ErrorType.BAD_REQUEST, `Node does not exist`)

  if (user._id !== existingNode.owner)
    throw AppError(ErrorType.FORBIDDEN, 'Permision denied')

  return Node.findByIdAndDelete(nodeId).select('_id').lean().exec()
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
