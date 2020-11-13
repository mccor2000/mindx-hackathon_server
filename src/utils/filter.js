import Joi from '@hapi/joi'

export const FilterSchema = Joi.object({
  where: Joi.object(),
  fields: Joi.array(),
  order: Joi.array(),
  offset: Joi.number(),
  limit: Joi.number(),
  skip: Joi.number(),
})
