import { Roadmap } from '../../roadmap/model'

import roadmapService from '../../roadmap/service'
import { AppError, ErrorType } from '../../../utils/errors'

const getProfile = async (user) => {
  return user.profile
}

const updateProfile = async (user, profile) => {
  if (!user) throw new AppError(ErrorType.UNAUTHORIZED, `Unauthorized`)

  user.profile = profile
  await user.save()
}

const getAllRegisteredRoadmap = async (user) => {
  return Promise.all(
    user.currentRoadmaps.map((roadmap) =>
      Roadmap.findById(roadmap.roadmapId).select('_id name field').lean().exec()
    )
  )
}

const registerRoadmap = async (user, { roadmapId }) => {
  const idx = user.currentRoadmaps.findIndex(
    (ele) => ele.roadmapId == roadmapId
  )

  if (idx >= 0)
    throw new AppError(
      ErrorType.BAD_REQUEST,
      `You have already registered this roadmap`
    )
  user.currentRoadmaps.push({ roadmapId })

  await user.save()
  return { _id: roadmapId }
}

const getRoadmapProgress = async (user, roadmapId) => {
  const idx = user.currentRoadmaps.findIndex(
    (ele) => ele.roadmapId == roadmapId
  )
  if (idx < 0)
    throw new AppError(ErrorType.BAD_REQUEST, `Roadmap does not exist`)

  const roadmapProgress = user.currentRoadmaps[idx]
  const roadmap = await roadmapService.getRoadmapById(roadmapProgress.roadmapId)

  return { roadmap, finished: roadmapProgress.finished }
}

const updateRoadmapProgress = async (user, roadmapId, { finishedNodeId }) => {
  const idx = user.currentRoadmaps.findIndex(
    (ele) => ele.roadmapId == roadmapId
  )
  if (idx < 0)
    throw new AppError(ErrorType.BAD_REQUEST, `Roadmap does not exist`)

  user.currentRoadmaps[idx].finished.push(finishedNodeId)
  await user.save()
}

const unregisterRoadmap = async (user, roadmapId) => {
  user.currentRoadmaps = user.currentRoadmaps.filter(
    (ele) => ele.roadmapId != roadmapId
  )

  await user.save()
}

const changePassword = async (user, { password, newPassword }) => {
  if (password === newPassword)
    throw new AppError(
      ErrorType.BAD_REQUEST,
      `New password can not be old password`
    )

  const isValidPassword = await user.comparePassword(password)
  if (!isValidPassword)
    throw new AppError(ErrorType.UNAUTHORIZED, `Password incorrect`)

  user.password = newPassword
  await user.save()
}

export default {
  getProfile,
  updateProfile,

  getAllRegisteredRoadmap,
  registerRoadmap,
  getRoadmapProgress,
  updateRoadmapProgress,
  unregisterRoadmap,

  changePassword,
}
