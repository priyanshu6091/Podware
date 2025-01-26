// models/channel.model.js
const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  avatar: { type: String, default: '' },
  banner: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Owner of the channel
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users following the channel
  createdAt: { type: Date, default: Date.now },
});

const Channel = mongoose.model('Channel', ChannelSchema);
module.exports = Channel;