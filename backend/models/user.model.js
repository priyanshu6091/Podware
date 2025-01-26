const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: 'User' }, // Default role as User
    metadata: {
        location: { type: String, default: '' },
        avatar_url: { type: String, default: '' },
    },
    description: { type: String }, // Channel description for podcasters
    banner: { type: String }, // Banner image for the channel
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of subscribers
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        'podware',
        { expiresIn: '24h' }
    );
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
