import passport from 'passport'
import { AppError, ErrorType } from '../utils'

export function authenticate(strategy, options) {
  return async (req, res, next) => {
    passport.authenticate(strategy, options, async (err, user, _) => {
      if (err) return next(err)
      if (!user)
        return next(new AppError(ErrorType.UNAUTHORIZED, 'Unauthorized'))
      req.user = user
      next()
    })(req, res, next)
  }
}
