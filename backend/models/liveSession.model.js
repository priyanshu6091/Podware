// models/livesession.model.js
const mongoose = require('mongoose');

const LiveSessionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'Podcaster', required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date },
  });
  
  module.exports = mongoose.model('LiveSession', LiveSessionSchema);