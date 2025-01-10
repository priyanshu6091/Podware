const express = require('express');
const reelController = require('../controllers/reel.controller');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, reelController.createReel);
router.get('/', reelController.getReels);

module.exports = router;