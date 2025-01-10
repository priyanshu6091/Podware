const podcasterModel = require('../models/podcaster.model');

module.exports.createPodcaster = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    const podcaster = await podcasterModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    return podcaster;
}
