const Episode = require('../models/episode.model');
const Podcast = require('../models/podcast.model');

exports.createEpisode = async (req, res) => {
    const { title, description, audioUrl, podcastId } = req.body;

    try {
        const episode = new Episode({ title, description, audioUrl, podcast: podcastId });
        await episode.save();

        await Podcast.findByIdAndUpdate(podcastId, { $push: { episodes: episode._id } });
        res.status(201).json(episode);
    } catch (error) {
        res.status(500).json({ message: 'Error creating episode', error });
    }
};

exports.getEpisodes = async (req, res) => {
    const { podcastId } = req.params;

    try {
        const episodes = await Episode.find({ podcast: podcastId });
        res.status(200).json(episodes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching episodes', error });
    }
};