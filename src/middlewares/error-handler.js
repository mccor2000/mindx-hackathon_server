import { AppError } from '../utils'

export async function handleError(err, _, res, next) {
  if (err instanceof AppError && err.isOperational) {
    res.status(err.statusCode).json({
      error: {
        code: err.statusCode,
        type: err.type,
        message: err.message,
      },
    })
  }

  next(err)
}
