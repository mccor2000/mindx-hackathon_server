import { ErrorType, AppError } from '../utils'

export function validate(schema, source) {
  return async (req, _, next) => {
    const { error } = schema.validate(req[source])
    if (error)
      next(
        new AppError(
          ErrorType.BAD_REQUEST,
          error.details.map((err) => err.message)
        )
      )

    next()
  }
}
