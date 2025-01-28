// backend/routes/video.routes.js
const express = require('express');
const { getVideoDetails } = require('../controllers/video.controller');

const router = express.Router();

// Route to fetch video details by ID
router.get('/:videoId', getVideoDetails);

module.exports = router;
