import { model, Schema } from 'mongoose'

const Field = new Schema({
  name: {
    type: String,
    required: true,
  },

  subFields: [String],
})

export default model('Field', Field, 'fields')
