import service from '../service'
import { wrap } from '../../../utils'

const getProfile = async (req, res) => {
  const profile = await service.getProfile(req.user)

  res.status(200).json({
    data: profile,
  })
}

const updateProfile = async (req, res) => {
  await service.updateProfile(req.user, req.body)

  res.status(204).end()
}

const getAllRegisteredRoadmap = async (req, res) => {
  const roadmaps = await service.getAllRegisteredRoadmap(req.user)

  res.status(200).json({ data: roadmaps })
}

const registerRoadmap = async (req, res) => {
  const registeredRoadmap = await service.registerRoadmap(req.user, req.body)

  res.status(201).json({ data: registeredRoadmap })
}

const getRoadmapProgress = async (req, res) => {
  const roadmapProgress = await service.getRoadmapProgress(
    req.user,
    req.params.roadmapId
  )

  res.status(200).json({ data: roadmapProgress })
}

const updateRoadmapProgress = async (req, res) => {
  await service.updateRoadmapProgress(req.user, req.params.roadmapId, req.body)

  res.status(204).end()
}

const unregisterRoadmap = async (req, res) => {
  await service.unregisterRoadmap(req.user, req.params.roadmapId)

  res.status(204).end()
}

const changePassword = async (req, res) => {
  await service.changePassword(req.user, req.body)

  res.status(204).end()
}
export default {
  getProfile: wrap(getProfile),
  updateProfile: wrap(updateProfile),

  getAllRegisteredRoadmap: wrap(getAllRegisteredRoadmap),
  registerRoadmap: wrap(registerRoadmap),
  getRoadmapProgress: wrap(getRoadmapProgress),
  updateRoadmapProgress: wrap(updateRoadmapProgress),
  unregisterRoadmap: wrap(unregisterRoadmap),

  changePassword: wrap(changePassword),
}
