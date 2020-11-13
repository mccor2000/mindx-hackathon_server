import service from '../service'
import { wrap } from '../../../utils'

const getProfile = async (req, res) => {
  const profile = await service.getProfile(req.user)

  res.status(200).json({
    data: profile,
  })
}

const updateProfile = async (req, res) => {
  await service.updateProfile(req.user, req.body)

  res.status(204).end()
}

const changePassword = async (req, res) => {
  await service.changePassword(req.user, req.body)

  res.status(204).end()
}
export default {
  getProfile: wrap(getProfile),
  updateProfile: wrap(updateProfile),
  changePassword: wrap(changePassword),
}
