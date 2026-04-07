import { pool } from '../config/database.js'

const createDestination = async (req, res) => {
  try {
    const { destination, description, city, country, img_url, flag_img_url } = req.body
    const results = await pool.query(
      `INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [destination, description, city, country, img_url, flag_img_url]
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getDestinations = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM destinations ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const createTripDestination = async (req, res) => {
  try {
    const { trip_id, destination_id } = req.body
    const results = await pool.query(
      `INSERT INTO trips_destinations (trip_id, destination_id) VALUES($1, $2) RETURNING *`,
      [trip_id, destination_id]
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getTripDestinations = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query(
      `SELECT destinations.* FROM destinations
       JOIN trips_destinations ON destinations.id = trips_destinations.destination_id
       WHERE trips_destinations.trip_id = $1`,
      [id]
    )
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  createDestination,
  getDestinations,
  createTripDestination,
  getTripDestinations
}
