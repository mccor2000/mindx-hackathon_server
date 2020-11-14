import { model, Schema } from 'mongoose'

const Field = new Schema({
  title: String,
  majors: [{ title: String, picture: String }],
})

export default model('Field', Field, 'fields')
