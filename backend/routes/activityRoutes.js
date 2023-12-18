const express = require('express');
const router = express.Router();
const {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity
} = require('../controllers/activityController');

router.get('/', getAllActivities);
router.get('/:id', getActivityById);
router.post('/', createActivity);
router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);

module.exports = router;