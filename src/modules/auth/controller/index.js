import service from '../service'
import { wrap } from '../../../utils'

const signup = async (req, res) => {
  const newUser = await service.createUser(req.body)

  res.status(201).json({ data: newUser })
}

const login = async (req, res) => {
  const user = await service.signin(req.body)
  const tokens = await service.createTokens(user)

  return res.status(200).json({ data: tokens })
}

export default {
  signup: wrap(signup),
  login: wrap(login),
}
