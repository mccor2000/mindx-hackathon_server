import { model, Schema } from 'mongoose'

const Room = new Schema({
  roadmapId: {
    type: Schema.Types.ObjectId,
    ref: 'roadmaps',
  },

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],

  roomId: String,
})

export default model('Room', Room, 'rooms')
