import { AppError, ErrorType } from '../../../utils/errors'
import Room from '../model'
import { Roadmap } from '../../roadmap/model'

const getManyRooms = async (filter = {}) => {
  const rooms = await Room.find(filter).lean().exec()

  return rooms
}

const createRoom = async (roomData) => {
  const existingRoadmap = await Roadmap.findById(roomData.roadmapId)
    .lean()
    .exec()

  if (!existingRoadmap)
    throw new AppError(ErrorType.BAD_REQUEST, 'Roadmap not found')

  return Room.create(roomData)
}

const getRoomById = async (roomId) => {
  const room = await Room.findById(roomId).lean().exec()

  if (!room) throw new AppError(ErrorType.BAD_REQUEST, 'Room not found')

  return room
}

const updateRoomById = async (roomId, updateData) => {
  const updatedRoom = await Room.findByIdAndUpdate(roomId, updateData)
    .select('_id')
    .lean()
    .exec()

  if (!updatedRoom) throw new AppError(ErrorType.BAD_REQUEST, 'Room not found')

  return updatedRoom
}

const deleteRoomById = async (roomId) => {
  const deletedRoom = await Room.findByIdAndDelete(roomId)
    .select('_id')
    .lean()
    .exec()

  if (!deletedRoom) throw new AppError(ErrorType.BAD_REQUEST, 'Room not found')

  return deletedRoom
}

export default {
  getManyRooms,
  createRoom,
  getRoomById,
  updateRoomById,
  deleteRoomById,
}
