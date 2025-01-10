const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    podcast: { type: mongoose.Schema.Types.ObjectId, ref: 'Podcast', required: true },
    audioUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Episode', episodeSchema);