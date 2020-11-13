export const ErrorType = Object.freeze({
  BAD_REQUEST: 'BadRequest',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'NotFound',
  INTERNAL: 'Internal',
})

export class AppError extends Error {
  constructor(type, message, isOperational) {
    super(message || 'Something went wrong. Please try again later')

    this.type = type || ErrorType.INTERNAL
    this.isOperational = isOperational || true

    switch (type) {
      case ErrorType.BAD_REQUEST:
        this.statusCode = 400
        break
      case ErrorType.UNAUTHORIZED:
        this.statusCode = 401
        break
      case ErrorType.FORBIDDEN:
        this.statusCode = 403
        break
      case ErrorType.NOT_FOUND:
        this.statusCode = 404
        break
      case ErrorType.INTERNAL:
        this.statusCode = 500
        break
    }

    Error.captureStackTrace(this, this.constructor)
  }
}
