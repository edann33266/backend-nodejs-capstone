
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const pinoHttp = require('pino-http')

const pinoLogger = require('./logger')
const connectToDatabase = require('./models/db')

const secondChanceRoutes = require('./routes/secondChanceItemsRoutes')
const authRoutes = require('./routes/authRoutes')
const searchRoutes = require('./routes/searchRoutes')
const logger = require('./logger')

const app = express()
const port = 3060

app.use('*', cors())
app.use(express.json())
app.use(pinoHttp({ logger }))
app.use(express.static(path.join(__dirname, 'public')))

// Connect to MongoDB (one-time)
connectToDatabase()
  .then(() => {
    pinoLogger.info('Connected to DB')
  })
  .catch((e) => {
    console.error('Failed to connect to DB', e)
  })

// Routes
app.use('/api/secondchance/items', secondChanceRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/secondchance/search', searchRoutes)

app.get('/', (req, res) => {
  res.send('Inside the server')
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Internal Server Error')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
