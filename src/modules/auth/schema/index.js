import Joi from '@hapi/joi'

export const LoginRequestBody = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).max(32).trim().required(),
})

export const SignupRequestBody = Joi.object({
  firstName: Joi.string().max(64).trim().required(),
  lastName: Joi.string().max(64).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).max(32).trim().required(),
})
