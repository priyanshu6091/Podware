const express = require('express');
const rewardController = require('../controllers/reward.controller');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticate, rewardController.getUserRewards);
router.post('/update', authenticate, rewardController.updateUserCoins);

module.exports = router;