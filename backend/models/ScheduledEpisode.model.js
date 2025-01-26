const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduledEpisodeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    scheduleDate: { type: Date, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Podcaster', required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['scheduled'], default: 'scheduled' }, // Fixed status
  },
  { timestamps: true } // This will automatically add createdAt and updatedAt fields
);

const ScheduledEpisode = mongoose.model('ScheduledEpisode', scheduledEpisodeSchema);

module.exports = ScheduledEpisode;
