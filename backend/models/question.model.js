const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User  ', required: true },
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);