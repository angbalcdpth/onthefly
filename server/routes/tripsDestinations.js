import express from 'express'
import DestinationsController from '../controllers/destinations.js'

const router = express.Router()

router.get('/destinations/:id', DestinationsController.getTripDestinations)
router.post('/', DestinationsController.createTripDestination)
router.post('/create', DestinationsController.createTripDestination)

export default router
