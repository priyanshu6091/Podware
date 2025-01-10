const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Podcast', podcastSchema);