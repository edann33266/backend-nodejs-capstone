const express = require('express')
const connectToDatabase = require('../models/db')

const router = express.Router()

// Search for gifts
router.get('/', async (req, res, next) => {
  try {
    const db = await connectToDatabase()
    const collection = db.collection('secondChanceItems')

    // Initialize the query object
    const query = {}

    // Add the name filter (partial, case-insensitive)
    if (req.query.name && req.query.name.trim() !== '') {
      query.name = { $regex: req.query.name, $options: 'i' }
    }

    // Add other filters
    if (req.query.category) {
      query.category = req.query.category
    }

    if (req.query.condition) {
      query.condition = req.query.condition
    }

    if (req.query.age_years) {
      query.age_years = { $lte: parseInt(req.query.age_years, 10) }
    }

    const gifts = await collection.find(query).toArray()
    res.json(gifts)
  } catch (e) {
    next(e)
  }
})

module.exports = router
