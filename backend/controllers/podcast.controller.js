const Podcast = require('../models/podcast.model');
const Episode = require('../models/episode.model');

exports.createPodcast = async (req, res) => {
    const { title, description } = req.body;
    const creator = req.user._id;

    try {
        const podcast = new Podcast({ title, description, creator });
        await podcast.save();
        res.status(201).json(podcast);
    } catch (error) {
        res.status(500).json({ message: 'Error creating podcast', error });
    }
};

exports.getPodcasts = async (req, res) => {
    try {
        const podcasts = await Podcast.find().populate('creator', 'fullname');
        res.status(200).json(podcasts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching podcasts', error });
    }
};

exports.getPodcastDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const podcast = await Podcast.findById(id).populate('creator', 'fullname').populate('episodes');
        if (!podcast) return res.status(404).json({ message: 'Podcast not found' });
        res.status(200).json(podcast);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching podcast details', error });
    }
};