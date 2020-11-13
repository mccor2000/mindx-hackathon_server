import express from 'express'

import injectSequence from './sequence'
import injectPassport from './passport'
import mainRouter from './app.route'

import { connectMongoDatasource } from './datasource'
import { handleNotFound, handleError } from './middlewares'

connectMongoDatasource()
const app = express()

injectSequence(app)
injectPassport(app)

app.use('/api', mainRouter)
app.use(handleNotFound)
app.use(handleError)

export default app
