const adminModel = require('../models/admin.model');
const userService = require('../services/admin.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.registerAdmin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isAdminAlready = await adminModel.findOne({ email });

    if (isAdminAlready) {
        return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await adminModel.hashPassword(password);

    const admin = await userService.createAdmin({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = admin.generateAuthToken();

    res.status(201).json({ token, admin });
}

module.exports.loginAdmin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email }).select('+password');

    if (!admin) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = admin.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, admin });
}

exports.getAdminProfile = async (req, res) => {
    res.status(200).json(req.user); // `req.user` is set by middleware
};

exports.manageUsers = async (req, res) => {
    const User = require('../models/user.model');
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};


module.exports.logoutAdmin = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out' });
}
