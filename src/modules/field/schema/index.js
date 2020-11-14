import Joi from '@hapi/joi'

export const CreateFieldRequestBody = Joi.object({
  name: Joi.string().max(64).required(),
})

export const UpdateFieldRequestBody = Joi.object({
  name: Joi.string(),
  subFields: Joi.array().items(Joi.string()),
})
