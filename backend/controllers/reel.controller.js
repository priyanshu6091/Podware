const Reel = require('../models/reel.model');

exports.createReel = async (req, res) => {
    const { title, videoUrl } = req.body;
    const creator = req.user._id;

    try {
        const reel = new Reel({ title, videoUrl, creator });
        await reel.save();
        res.status(201).json(reel);
    } catch (error) {
        res.status(500).json({ message: 'Error creating reel', error });
    }
};

exports.getReels = async (req, res) => {
    try {
        const reels = await Reel.find().populate('creator', 'fullname');
        res.status(200).json(reels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reels', error });
    }
};