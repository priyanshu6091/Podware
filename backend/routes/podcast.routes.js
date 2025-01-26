const express = require('express');
const multer = require('multer');
const {
  uploadPodcast,
  getPodcasts,
  startLiveSession,
  endLiveSession,
  scheduleEpisode,
  batchEditEpisodes,
  getScheduledEpisodes,
  getAllPodcasts
} = require('../controllers/podcast.controller');
const auth = require('../middlewares/auth');
const router = express.Router();

// Configure multer for audio file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'audio') {
        cb(null, 'uploads/podcasts'); // Audio files folder
      } else if (file.fieldname === 'video') {
        cb(null, 'uploads/videos'); // Video files folder
      } else {
        cb(new Error('Unexpected field'));
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

router.post(
  '/upload',
  auth.authenticate,
  upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  uploadPodcast
);
router.get('/all', getAllPodcasts);

// Fetch uploaded podcasts
router.get('/', auth.authenticate, getPodcasts);

// Fetch scheduled episodes
router.get('/schedule', auth.authenticate, getScheduledEpisodes);

// Schedule an episode
router.post('/schedule', auth.authenticate, scheduleEpisode);

// Start and end live sessions
router.post('/live/start', auth.authenticate, startLiveSession);
router.post('/live/end', auth.authenticate, endLiveSession);

// Batch edit episodes
router.put('/batch-edit', auth.authenticate, batchEditEpisodes);

module.exports = router;
