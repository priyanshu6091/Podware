// models/podcast.model.js
const mongoose = require('mongoose');

const PodcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  audioUrl: { type: String },
  videoUrl: { type: String }, // Add video URL field
  thumbnailUrl: { type: String },
  duration: { type: String },
  categories: { type: [String] },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Podcaster', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Podcast', PodcastSchema);
