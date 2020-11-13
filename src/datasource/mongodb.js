import mongoose from 'mongoose'
import config from '../app.config'

export const connectMongoDatasource = () => {
  mongoose
    .connect(config.db.url, config.db.options)
    .then(() => {
      console.log('Mongoose connection done')
    })
    .catch((err) => {
      console.log(`Mongoose connnection error: ${err}`)
    })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected')
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection disconnected through app termination')
      process.exit(0)
    })
  })
}
