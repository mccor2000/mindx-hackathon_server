import { ErrorType, AppError } from '../utils'

export function authorize(roles) {
  return async (req, _, next) => {
    if (roles.length && !roles.includes(req.user.role))
      next(new AppError(ErrorType.FORBIDDEN, `Permisson denied`))

    next()
  }
}
