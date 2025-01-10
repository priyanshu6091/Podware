const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
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
    role: { 
        type: String, 
        default: 'Admin' 
    },
    password: {
        type: String,
        required: true,
        select: false
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
});

// Generate Auth Token for Admin
adminSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, role: 'Admin' }, 'podware', { expiresIn: '24h' });
};

// Compare password
adminSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Hash password
adminSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
