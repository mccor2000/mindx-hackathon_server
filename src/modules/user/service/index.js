import { AppError, ErrorType } from '../../../utils/errors'

const getProfile = async (user) => {
  return user.profile
}

const updateProfile = async (user, profile) => {
  if (!user) throw new AppError(ErrorType.UNAUTHORIZED, `Unauthorized`)

  user.profile = profile
  await user.save()
}

const changePassword = async (user, { password, newPassword }) => {
  if (password === newPassword)
    throw new AppError(
      ErrorType.BAD_REQUEST,
      `New password can not be old password`
    )

  const isValidPassword = await user.comparePassword(password)
  if (!isValidPassword)
    throw new AppError(ErrorType.UNAUTHORIZED, `Password incorrect`)

  user.password = newPassword
  await user.save()
}

export default {
  getProfile,
  updateProfile,
  changePassword,
}
