const express = require('express');
const questionController = require('../controllers/question.controller');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, questionController.askQuestion);
router.get('/', questionController.getQuestions);
router.post('/upvote/:id', authenticate, questionController.upvoteQuestion);

module.exports = router;