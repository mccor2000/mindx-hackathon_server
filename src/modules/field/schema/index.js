import Joi from '@hapi/joi'

export const CreateFieldRequestBody = Joi.object({
  title: Joi.string().max(64).required(),
})

export const UpdateFieldRequestBody = Joi.object({
  title: Joi.string(),
  majors: Joi.array().items(
    Joi.object({ title: Joi.string(), picture: Joi.string() })
  ),
})
