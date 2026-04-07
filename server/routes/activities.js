import express from 'express'
import ActivitiesController from '../controllers/activities.js'

const router = express.Router()

router.get('/:id', ActivitiesController.getActivities)
router.post('/:id', ActivitiesController.createActivity)
router.patch('/:id', ActivitiesController.updateActivity)

export default router
