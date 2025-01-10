const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const Podcaster = require('../models/podcaster.model');

authorize = (allowedRoles) => async (req, res, next) => {
    console.log(req.headers.authorization+" req.headers.authorization");
    // const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdiNjYzNmMyZThlN2U2YjhkMzZlMWEiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MzYzMjg0OTYsImV4cCI6MTczNjQxNDg5Nn0.f_FtoU_gqaAGIRZSAgHSijn9FZQaatj_kXALB3b79pM'
    const token =req.headers.authorization?.split(' ')[1];
    console.log(token+" a");
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // const decoded = jwt.decode(token);
        const decoded = jwt.verify(token,'podware');
        console.log(decoded)
        req.role = decoded.role;
        req.userId = decoded._id;
        console.log(decoded._id);
        // Role-based validation
        let user = null;
        if (req.role === 'Admin' && allowedRoles.includes('Admin')) {
            user = await Admin.findById(decoded._id);
        } else if (req.role === 'Podcaster' && allowedRoles.includes('Podcaster')) {
            user = await Podcaster.findById(decoded._id);
        } else if (req.role === 'User' && allowedRoles.includes('User')) {
            user = await User.findById(decoded._id);
        }

        if (!user) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports =  {authorize};
