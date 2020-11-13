require('dotenv').config()

export default {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  db: {
    url: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      poolSize: 10,
    },
  },
  corsUrl: process.env.CORS_URL,
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    options: {
      algorithm: 'HS256',
      expiresIn: '1d',
    },
  },
  swagger: {
    apis: ['docs/api/common.yml', 'docs/api/**/*.yml'],
    swaggerDefinition: {
      openapi: '3.0.0',
      components: {},
      info: {
        title: 'MindX Hackthon Project',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000/api',
          description: 'Development server',
        },
        {
          url: 'https://mindx-hackathon.herokuapp.com/api',
          description: 'Production server',
        },
      ],
    },
  },
}
