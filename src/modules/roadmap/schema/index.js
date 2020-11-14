import Joi from '@hapi/joi'

export const CreateRoadmapRequestBody = Joi.object({
  field: Joi.string().max(64).required(),
  name: Joi.string().max(64).required(),
})

export const UpdateRoadmapRequestBody = Joi.object({
  field: Joi.string(),
  name: Joi.string(),
})

export const AddNodeToRoadMapRequestBody = Joi.object({
  nodeId: Joi.string().required(),
  parentId: Joi.string().required(),
})

export const UpdateNodeByIdRequestBody = Joi.object({
  title: Joi.string(),
  overview: Joi.string(),
  references: Joi.array().items(
    Joi.object({ description: Joi.string(), url: Joi.string() })
  ),
  parent: Joi.string(),
  children: Joi.array().items(Joi.string()),
  position: Joi.object({
    x: Joi.number(),
    y: Joi.number(),
  }),
})
