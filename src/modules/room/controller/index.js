import service from '../service'
import { wrap } from '../../../utils'

const getManyRooms = async (_req, res) => {
  const rooms = await service.getManyRooms()

  res.status(200).json({ data: rooms })
}

const createRoom = async (req, res) => {
  const newRoom = await service.createRoom(req.body)

  res.status(201).json({ data: newRoom })
}

const getRoomById = async (req, res) => {
  const room = await service.getRoomById(req.params.roomId)

  res.status(200).json({ data: room })
}

const updateRoomById = async (req, res) => {
  const updatedRoom = await service.updateRoomById(req.params.roomId, req.body)

  res.status(200).json({ updatedRoom })
}

const deleteRoomById = async (req, res) => {
  await service.deleteRoomById(req.params.roomId)

  res.status(204).end()
}

export default {
  getManyRooms: wrap(getManyRooms),
  createRoom: wrap(createRoom),
  getRoomById: wrap(getRoomById),
  updateRoomById: wrap(updateRoomById),
  deleteRoomById: wrap(deleteRoomById),
}
