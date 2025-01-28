// backend/controllers/video.controller.js
const Podcast = require('../models/podcast.model');

exports.getVideoDetails = async (req, res) => {
  const { videoId } = req.params;

  try {
    const video = await Podcast.findById(videoId).populate('uploadedBy', 'fullname metadata.avatar_url');
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({
      _id: video._id,
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl,
      duration: video.duration,
      uploadedBy: video.uploadedBy,
    });
  } catch (error) {
    console.error('Error fetching video details:', error);
    res.status(500).json({ message: 'Error fetching video details', error });
  }
};
