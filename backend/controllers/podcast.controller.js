const Podcast = require('../models/podcast.model');
const LiveSession = require('../models/liveSession.model');
const ScheduledEpisode = require('../models/ScheduledEpisode.model');
const Podcaster = require('../models/podcaster.model');

exports.getPodcasterProfile = async (req, res) => {
  const podcasterId = req.params.id;

  try {
    const podcaster = await Podcaster.findById(podcasterId).populate('metadata');
    if (!podcaster) return res.status(404).json({ message: 'Podcaster not found' });

    const podcasts = await Podcast.find({ uploadedBy: podcasterId }).populate('uploadedBy', 'fullname');

    res.status(200).json({ podcaster, podcasts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching podcaster profile', error: error.message });
  }
};
// Upload a podcast
exports.uploadPodcast = async (req, res) => {
  const { title, description, duration, categories } = req.body;

  if (!title || !description || !duration) {
    return res.status(400).json({ message: 'Please provide all required fields (title, description, duration).' });
  }

  if (!req.files || (!req.files.audio && !req.files.video)) {
    return res.status(400).json({ message: 'Please upload an audio or video file.' });
  }

  try {
    const audioUrl = req.files.audio ? `/uploads/podcasts/${req.files.audio[0].filename}` : null;
    const videoUrl = req.files.video ? `/uploads/videos/${req.files.video[0].filename}` : null;

    const podcast = new Podcast({
      title,
      description,
      duration,
      categories: categories ? categories.split(',') : [],
      audioUrl,
      videoUrl,
      uploadedBy: req.user._id,
    });

    await podcast.save();
    res.status(201).json({ message: 'Podcast uploaded successfully.', podcast });
  } catch (error) {
    console.error('Error uploading podcast:', error.message);
    res.status(500).json({ message: 'Error uploading podcast.', error });
  }
};

// Fetch all podcasts
exports.getPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find({ uploadedBy: req.user._id });
    res.status(200).json({ podcasts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching podcasts.', error });
  }
};

// Fetch all podcasts including videos
exports.getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find().select('-uploadedBy'); // Fetch all podcasts, excluding user-specific data for public view
    res.status(200).json({ podcasts });
  } catch (error) {
    console.error('Error fetching podcasts:', error.message);
    res.status(500).json({ message: 'Error fetching podcasts.', error });
  }
};


// Start a live session
exports.startLiveSession = async (req, res) => {
  const { title } = req.body;

  try {
    const liveSession = new LiveSession({
      title,
      host: req.user._id,
    });

    await liveSession.save();
    res.status(201).json({ message: 'Live session started.', liveSession });
  } catch (error) {
    res.status(500).json({ message: 'Error starting live session.', error });
  }
};

// End a live session
exports.endLiveSession = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const liveSession = await LiveSession.findById(sessionId);

    if (!liveSession) {
      return res.status(404).json({ message: 'Live session not found.' });
    }

    liveSession.endedAt = Date.now();
    await liveSession.save();
    res.status(200).json({ message: 'Live session ended.', liveSession });
  } catch (error) {
    res.status(500).json({ message: 'Error ending live session.', error });
  }
};
// Schedule an episode
exports.scheduleEpisode = async (req, res) => {
  const { title, description, scheduleDate } = req.body;

  try {
    if (!title || !description || !scheduleDate) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const scheduledEpisode = new ScheduledEpisode({
      title,
      description,
      scheduleDate,
      uploadedBy: req.user._id,
    });

    await scheduledEpisode.save();
    res.status(201).json({ message: 'Episode scheduled successfully.', scheduledEpisode });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling episode.', error });
  }
};

// Fetch scheduled episodes
exports.getScheduledEpisodes = async (req, res) => {
  try {
    const episodes = await ScheduledEpisode.find({ uploadedBy: req.user._id });
    res.status(200).json({ episodes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scheduled episodes.', error });
  }
};
// Publish a scheduled episode
exports.publishScheduledEpisode = async (req, res) => {
  const { episodeId, audioUrl } = req.body;

  try {
    const scheduledEpisode = await ScheduledEpisode.findById(episodeId);

    if (!scheduledEpisode) {
      return res.status(404).json({ message: 'Scheduled episode not found.' });
    }

    const podcast = new Podcast({
      title: scheduledEpisode.title,
      description: scheduledEpisode.description,
      audioUrl,
      uploadedBy: scheduledEpisode.uploadedBy,
      categories: [], // Add categories if needed
    });

    await podcast.save();
    await scheduledEpisode.deleteOne();

    res.status(201).json({ message: 'Episode published successfully.', podcast });
  } catch (error) {
    console.error('Error publishing episode:', error.message);
    res.status(500).json({ message: 'Error publishing episode.', error });
  }
};
// Batch edit episodes
exports.batchEditEpisodes = async (req, res) => {
  const { episodes, updates } = req.body;

  try {
    if (!episodes || !updates) {
      return res.status(400).json({ message: 'Episodes and updates are required.' });
    }

    const updatedEpisodes = await Podcast.updateMany(
      { _id: { $in: episodes } },
      { $set: updates }
    );

    res.status(200).json({ message: 'Batch update successful.', updatedEpisodes });
  } catch (error) {
    res.status(500).json({ message: 'Error updating episodes.', error });
  }
};