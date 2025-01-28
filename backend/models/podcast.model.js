// models/podcast.model.js
const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  audioUrl: { type: String },
  videoUrl: { type: String },
  thumbnailUrl: { type: String },
  duration: { type: String },
  categories: { type: [String] },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Podcaster', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;