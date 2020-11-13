import { model, Schema } from 'mongoose'

const Roadmap = new Schema({}, { timestamps: true })

export default model('Roadmap', Roadmap, 'roadmaps')
