const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
}

module.exports.updateUser = async (userId, updates) => {
    return await userModel.findByIdAndUpdate(userId, updates, { new: true });
};

module.exports.getUserRewards = async (userId) => {
    // Assuming a 'rewards' array in the User model
    const user = await userModel.findById(userId).select('rewards');
    return user.rewards;
};
