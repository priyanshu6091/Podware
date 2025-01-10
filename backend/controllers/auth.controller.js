const models = {
    Admin: require('../models/admin.model'),
    Podcaster: require('../models/podcaster.model'),
    User: require('../models/user.model'),
};
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    const { email, password, firstname, lastname, role } = req.body;

    if (!models[role]) {
        return res.status(400).json({ message: 'Invalid role provided.' });
    }

    const Model = models[role];

    try {
        const isExisting = await Model.findOne({ email });
        if (isExisting) {
            return res.status(400).json({ message: `${role} already exists.` });
        }

        const hashedPassword = await Model.hashPassword(password);
        const user = new Model({
            fullname: { firstname, lastname },
            email,
            password: hashedPassword,
            role,
        });

        await user.save();
        const token = jwt.sign({ _id: user._id, role: user.role }, 'podware', { expiresIn: '24h' });

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

exports.signIn = async (req, res) => {
    const { email, password, role } = req.body;
    console.log(req.body);
    if (!models[role]) {
        return res.status(400).json({ message: 'Invalid role provided.' });
    }

    const Model = models[role];
    console.log(Model)

    try {
        const user = await Model.findOne({ email }).select('+password');
        console.log(user)   
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, 'podware', { expiresIn: '24h' });
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in', error });
    }
}; 

exports.getCurrentUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized. No user found.' });
    }
    res.status(200).json(req.user);
};

exports.updateUserProfile = async (req, res) => {
    const { firstname, lastname, location, avatar_url } = req.body;

    if (!models[req.user.role]) {
        return res.status(400).json({ message: 'Invalid role provided.' });
    }

    const Model = models[req.user.role];

    try {
        const user = await Model.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if metadata exists
        if (!user.metadata) {
            user.metadata = {}; // Initialize metadata if missing
        }

        if (firstname) user.fullname.firstname = firstname;
        if (lastname) user.fullname.lastname = lastname;
        if (location) user.metadata.location = location;
        if (avatar_url) user.metadata.avatar_url = avatar_url;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating user profile:', error); // Log the error
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!models[req.user.role]) {
        return res.status(400).json({ message: 'Invalid role provided.' });
    }

    const Model = models[req.user.role];

    try {
        const user = await Model.findById(req.user._id).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }

        user.password = await Model.hashPassword(newPassword);
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error changing password', error });
    }
};
