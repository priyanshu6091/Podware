const adminModel = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.authAdmin = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.findById(decoded._id);

        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.admin = admin;
        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
