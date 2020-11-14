import Joi from '@hapi/joi'

export const UpdateProfileRequestBody = Joi.object({
  firstName: Joi.string().max(64).required(),
  lastName: Joi.string().max(64).required(),
})

export const RegisterRoadmapRequestBody = Joi.object({
  roadmapId: Joi.string().required(),
})

export const UpdateRoadmapProgressRequestBody = Joi.object({
  finishedNodeId: Joi.string().required(),
})

export const ChangePasswordRequestBody = Joi.object({
  password: Joi.string().min(6).max(32).trim().required(),
  newPassword: Joi.string().min(6).max(32).trim().required(),
})
