const express = require('express');
const { getChannels, getChannelDetails, followChannel, unfollowChannel } = require('../controllers/channel.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/all', getChannels); // Get all channels
router.get('/:id', getChannelDetails); // Get details for a specific channel
router.post('/:id/follow', auth.authenticate, followChannel); // Follow a channel
router.post('/:id/unfollow', auth.authenticate, unfollowChannel); // Unfollow a channel

module.exports = router;
