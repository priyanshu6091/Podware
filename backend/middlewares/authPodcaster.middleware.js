const podcasterModel = require('../models/podcaster.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.authPodcaster = async (req, res, next) => {
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
        const podcaster = await podcasterModel.findById(decoded._id);

        if (!podcaster) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.podcaster = podcaster;
        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
