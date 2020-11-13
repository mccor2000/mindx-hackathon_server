import passport from 'passport'
import User from '../modules/user/model'

export default (app) => {
  app.use(passport.initialize())

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean().exec()

      done(null, user)
    } catch (err) {
      done(err, false)
    }
  })

  // Passport strategies
  require('./passport-jwt')(passport)
}
