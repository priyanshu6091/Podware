const Question = require('../models/question.model');

exports.askQuestion = async (req, res) => {
    const { content } = req.body;
    const userId = req.user._id;

    try {
        const question = new Question({ user: userId, content });
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Error asking question', error });
    }
};

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('user', 'fullname');
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
};

exports.upvoteQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await Question.findByIdAndUpdate(id, { $inc: { upvotes: 1 } }, { new: true });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Error upvoting question', error });
    }
};