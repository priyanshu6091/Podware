const podcasterModel = require('../models/podcaster.model');
const userService = require('../services/podcaster.service.js');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.registerPodcaster = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isPodcasterAlready = await podcasterModel.findOne({ email });

    if (isPodcasterAlready) {
        return res.status(400).json({ message: 'Podcaster already exists' });
    }

    const hashedPassword = await podcasterModel.hashPassword(password);

    const podcaster = await userService.createPodcaster({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = podcaster.generateAuthToken();

    res.status(201).json({ token, podcaster });
};

module.exports.loginPodcaster = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const podcaster = await podcasterModel.findOne({ email }).select('+password');

    if (!podcaster) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await podcaster.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = podcaster.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, podcaster });
};

exports.getPodcasterProfile = async (req, res) => {
    res.status(200).json(req.user); // `req.user` is set by middleware
};

exports.createPodcast = async (req, res) => {
    const { title, description } = req.body;

    try {
        const Podcast = require('../models/podcast.model');
        const podcast = new Podcast({
            title,
            description,
            createdBy: req.user._id,
        });
        await podcast.save();
        res.status(201).json({ message: 'Podcast created successfully', podcast });
    } catch (error) {
        console.error('Error creating podcast:', error);
        res.status(500).json({ message: 'Error creating podcast', error: error.message });
    }
};

module.exports.logoutPodcaster = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out' });
};
