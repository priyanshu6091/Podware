const User = require('../models/user.model');
const Podcast = require('../models/podcast.model');

// Get all channels
exports.getChannels = async (req, res) => {
    try {
      const channels = await Channel.find().populate('owner', 'fullname metadata.avatar_url');
      res.status(200).json({
        channels: channels.map((channel) => ({
          _id: channel._id,
          name: channel.name,
          description: channel.description,
          avatar: channel.avatar || channel.owner.metadata.avatar_url,
          banner: channel.banner,
        })),
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching channels', error });
    }
  };
  

// Get channel details
exports.getChannelDetails = async (req, res) => {
    const { id } = req.params;
  
    try {
      const channel = await Channel.findById(id).populate('owner', 'fullname');
      if (!channel) return res.status(404).json({ message: 'Channel not found' });
  
      const podcasts = await Podcast.find({ uploadedBy: channel.owner._id });
      res.status(200).json({
        channel: {
          _id: channel._id,
          name: channel.name,
          description: channel.description,
          avatar: channel.avatar,
          banner: channel.banner,
        },
        podcasts,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching channel details', error });
    }
  };
  

// Follow a channel
exports.followChannel = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const channel = await User.findById(id);
        if (!channel) return res.status(404).json({ message: 'Channel not found' });

        if (!channel.subscribers.includes(userId)) {
            channel.subscribers.push(userId);
            await channel.save();
        }

        res.status(200).json({ message: 'Subscribed successfully', channel });
    } catch (error) {
        res.status(500).json({ message: 'Error subscribing to channel', error });
    }
};

// Unfollow a channel
exports.unfollowChannel = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const channel = await User.findById(id);
        if (!channel) return res.status(404).json({ message: 'Channel not found' });

        channel.subscribers = channel.subscribers.filter((subscriber) => subscriber.toString() !== userId);
        await channel.save();

        res.status(200).json({ message: 'Unsubscribed successfully', channel });
    } catch (error) {
        res.status(500).json({ message: 'Error unsubscribing from channel', error });
    }
};
