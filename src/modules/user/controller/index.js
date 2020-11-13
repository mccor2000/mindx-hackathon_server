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

const changePassword = async (req, res) => {
  await service.changePassword(req.user, req.body)

  res.status(204).end()
}

const getAllRegisteredCourses = async (req, res) => {
  const registeredCourses = await service.getAllRegisteredCourses(req.user)

  res.status(200).json({
    data: registeredCourses,
  })
}

const registerCourse = async (req, res) => {
  const { courseId } = req.body
  await service.registerCourse(req.user, courseId)

  res.status(201).end()
}

const getRegisteredCourse = async (req, res) => {
  const { courseId } = req.params
  const registeredCourse = await service.getRegistedCourse(req.user, courseId)

  res.status(200).json({ data: registeredCourse })
}

const markAsRead = async (req, res) => {
  const { courseId } = req.params
  const { lessonId } = req.body
  await service.markAsRead(req.user, courseId, lessonId)

  res.status(201).end()
}

const getStaffs = async (_req, res) => {
  const staffs = await service.getStaffs()

  res.status(200).json({ data: staffs })
}

const addStaff = async (req, res) => {
  const { userId } = req.body
  const staff = await service.addStaff(userId)

  res.status(200).json({ data: staff })
}

const removeStaff = async (req, res) => {
  const { userId } = req.body
  const staff = await service.removeStaff(userId)

  res.status(200).json({ data: staff })
}

export default {
  getProfile: wrap(getProfile),
  updateProfile: wrap(updateProfile),
  changePassword: wrap(changePassword),

  getAllRegisteredCourses: wrap(getAllRegisteredCourses),
  registerCourse: wrap(registerCourse),
  getRegisteredCourse: wrap(getRegisteredCourse),
  markAsRead: wrap(markAsRead),

  getStaffs: wrap(getStaffs),
  addStaff: wrap(addStaff),
  removeStaff: wrap(removeStaff),
}
