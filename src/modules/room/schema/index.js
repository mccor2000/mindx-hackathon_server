import Joi from '@hapi/joi'

export const CreateRoomRequestBody = Joi.object({
  roadmapId: Joi.string().max(64).required(),
})

export const UpdateRoomRequestBody = Joi.object({
  users: Joi.array().items(Joi.string()),
})
