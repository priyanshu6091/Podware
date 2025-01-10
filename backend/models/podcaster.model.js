const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const podcasterSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long']
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [6, 'Email must be at least 6 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: { 
        type: String, 
        default: 'Podcaster' 
    },
    metadata: {
        location: { 
            type: String, 
            default: '' 
        },
        avatar_url: { 
            type: String, 
            default: '' 
        },
    },
    podcasts: [
        {
            title: String,
            description: String,
            episodes: [
                {
                    title: String,
                    content: String,
                    duration: Number
                }
            ]
        }
    ]
});

// Generate Auth Token for Podcaster
podcasterSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, role: 'Podcaster' }, 'podware', { expiresIn: '24h' });
};

// Compare password
podcasterSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Hash password
podcasterSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

const Podcaster = mongoose.model('Podcaster', podcasterSchema);

module.exports = Podcaster;
