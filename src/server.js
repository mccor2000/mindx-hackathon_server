import app from './app'
import config from './app.config'

process.on('uncaughtException', (err) => {
  console.log(err)
  process.exit(1)
})

app.listen(config.port, () => {
  console.log(`Server is up and running on port ${config.port}`)
})
