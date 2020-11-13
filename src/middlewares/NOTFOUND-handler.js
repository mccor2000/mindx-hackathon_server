import { AppError, ErrorType } from '../utils'

export async function handleNotFound(req, __, next) {
  next(
    new AppError(
      ErrorType.NOT_FOUND,
      `Route ${req.method} - ${req.originalUrl} not found`
    )
  )
}
