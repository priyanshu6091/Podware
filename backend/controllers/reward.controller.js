const Reward = require('../models/reward.model');
const User = require('../models/user.model');

exports.getUserRewards = async (req, res) => {
    const userId = req.user._id;

    try {
        const rewards = await Reward.findOne({ user: userId });
        res.status(200).json(rewards || { coins: 0 });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rewards', error });
    }
};

exports.updateUserCoins = async (req, res) => {
    const userId = req.user._id;
    const { coins } = req.body;

    try {
        const reward = await Reward.findOneAndUpdate(
            { user: userId },
            { $inc: { coins } },
            { new: true, upsert: true }
        );
        res.status(200).json(reward);
    } catch (error) {
        res.status(500).json({ message: 'Error updating coins', error });
    }
};