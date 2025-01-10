const express = require('express');
const episodeController = require('../controllers/episode.controller');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, episodeController.createEpisode);
router.get('/:podcastId', episodeController.getEpisodes);

module.exports = router;