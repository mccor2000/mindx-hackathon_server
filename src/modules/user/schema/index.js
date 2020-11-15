import Joi from '@hapi/joi'

export const UpdateProfileRequestBody = Joi.object({
  firstName: Joi.string().max(64).required(),
  lastName: Joi.string().max(64).required(),
  picture: Joi.string().uri(),
})

export const UpdateContributorProfileRequestBody = Joi.object({
  education: Joi.string().required(),
  experiences: Joi.array().items(
    Joi.object({ title: Joi.string(), description: Joi.string() })
  ),
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
