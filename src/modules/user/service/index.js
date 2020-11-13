import User from '../model'
import { AppError, ErrorType } from '../../../utils/errors'

const getProfile = async (user) => {
  return user.profile
}

const updateProfile = async (user, profile) => {
  if (!user) throw new AppError(ErrorType.UNAUTHORIZED, `Unauthorized`)

  user.profile = profile
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

  user.credentials.password = newPassword
  await user.save()
}

const getAllRegisteredCourses = async (user) => {
  return user.courses
}

const registerCourse = async (user, courseId) => {
  user.courses.push({ courseId })

  await user.save()
}

const getRegistedCourse = async (user, courseId) => {
  const idx = user.courses.findIndex(
    (registeredCourse) => registeredCourse.courseId == courseId
  )
  if (idx < 0) throw new AppError(ErrorType.BAD_REQUEST, `Course not found`)
  const registeredCourse = user.courses[idx]

  return registeredCourse
}

const markAsRead = async (user, courseId, lessonId) => {
  const idx = user.courses.findIndex(
    (registeredCourse) => registeredCourse.courseId == courseId
  )
  user.courses[idx].finished.push(lessonId)

  await user.save()
}

const getStaffs = async () => {
  const staffs = await User.find({ role: 'staff' })
    .select('email profile')
    .exec()

  return staffs
}

const addStaff = async (id) => {
  const newStaff = await User.findByIdAndUpdate(id, { role: 'staff' })
    .select('email profile')
    .exec()

  return newStaff
}

const removeStaff = async (id) => {
  const removedStaff = await User.findByIdAndUpdate(id, { role: 'user' })
    .select('email profile')
    .exec()

  return removedStaff
}

export default {
  getProfile,
  updateProfile,
  changePassword,

  getAllRegisteredCourses,
  registerCourse,
  getRegistedCourse,
  markAsRead,

  getStaffs,
  addStaff,
  removeStaff,
}
