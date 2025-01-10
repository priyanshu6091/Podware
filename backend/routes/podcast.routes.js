const express = require('express');
const podcastController = require('../controllers/podcast.controller.js');
const { authenticate } = require('../middlewares/auth.js');

const router = express.Router();

router.post('/', authenticate, podcastController.createPodcast);
router.get('/', podcastController.getPodcasts);
router.get('/:id', podcastController.getPodcastDetails);

module.exports = router;