import Joi from '@hapi/joi'
import { Roles } from '../model'

export const UpdateProfileRequestBody = Joi.object({
  firstName: Joi.string().max(64).required(),
  lastName: Joi.string().max(64).required(),
  dateOfBirth: Joi.date().raw(true),
  gender: Joi.string()
    .trim()
    .allow(...Object.values(Roles)),
  studentID: Joi.string().alphanum().max(32),
  school: Joi.string().max(128).trim(),
  gravatar: Joi.string().uri().trim(),
})

export const RegisterCourseRequestBody = Joi.object({
  courseId: Joi.string().required(),
})

export const CourseStreakRequestBody = Joi.object({
  courseId: Joi.string().required(),
  lessonId: Joi.string().required(),
})

export const ChangePasswordRequestBody = Joi.object({
  password: Joi.string().min(6).max(32).trim().required(),
  newPassword: Joi.string().min(6).max(32).trim().required(),
})
