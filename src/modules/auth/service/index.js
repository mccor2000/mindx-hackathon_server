import { sign } from 'jsonwebtoken'
import { promisify } from 'util'
import _ from 'lodash'

import User from '../../user/model'
import { AppError, ErrorType } from '../../../utils/errors'
import config from '../../../app.config'

const signAsync = promisify(sign)

const createUser = async ({ firstName, lastName, email, password }) => {
  const userRecord = await User.findOne({ email }).lean().exec()
  if (userRecord)
    throw new AppError(ErrorType.BAD_REQUEST, 'Email is already taken')

  const newUser = await User.create({
    email,
    credentials: { password },
    profile: { firstName, lastName },
  })

  return _.pick(newUser, ['_id', 'role', 'verified'])
}

const signin = async ({ email, password }) => {
  const existingUser = await User.findOne({ email })
  if (!existingUser)
    throw new AppError(ErrorType.BAD_REQUEST, 'Invalid email or password')

  const isValidPassword = await existingUser.comparePassword(password)
  if (!isValidPassword)
    throw new AppError(ErrorType.BAD_REQUEST, 'Invalid email or password')

  return _.pick(existingUser, ['_id', 'role', 'verified'])
}

const createTokens = async (payload) => {
  const accessToken = await signAsync(
    payload,
    config.jwt.accessToken.secret,
    config.jwt.accessToken.options
  )

  return { accessToken }
}

export default {
  createUser,
  signin,
  createTokens,
}
