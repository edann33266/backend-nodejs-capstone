require('dotenv').config()
const { MongoClient } = require('mongodb')

const url = process.env.MONGO_URL
const dbName = 'secondChance'

let dbInstance = null

async function connectToDatabase () {
  if (dbInstance) {
    return dbInstance
  }

  const client = new MongoClient(url)

  // Connect to MongoDB
  await client.connect()

  // Connect to database and cache instance
  dbInstance = client.db(dbName)

  return dbInstance
}

module.exports = connectToDatabase
