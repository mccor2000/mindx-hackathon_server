import morgan from 'morgan'
import cors from 'cors'
import compression from 'compression'
import { json, urlencoded } from 'body-parser'

import config from './app.config'

export default (app) => {
  app.use(morgan(config.environment === 'development' ? 'dev' : 'common'))

  app.use(cors())
  app.use(json())
  app.use(compression())
  app.use(urlencoded({ extended: true }))
}
