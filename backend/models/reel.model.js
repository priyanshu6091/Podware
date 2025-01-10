const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User  ', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reel', reelSchema);