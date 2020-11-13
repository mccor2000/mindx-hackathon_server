import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import User from '../modules/user/model'
import AppConfig from '../app.config'

module.exports = (passport) => {
  const verify = async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id).lean().exec()
      if (!user) return done(null, false)

      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  }

  passport.use(
    new JwtStrategy(
      {
        ...AppConfig.jwt.options,
        secretOrKey: AppConfig.jwt.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      verify
    )
  )
}
