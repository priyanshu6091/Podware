const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const podcasterController = require('../controllers/podcaster.controller.js');
const authMiddleware = require('../middlewares/authPodcaster.middleware');
const { authorize } = require('../middlewares/authorize');

router.post('/register', [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
        podcasterController.registerPodcaster
    )


router.post('/login', [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
        podcasterController.loginPodcaster
);

router.get('/profile', authorize(['Podcaster']), podcasterController.getPodcasterProfile);

router.get('/logout', authorize(['Podcaster']), podcasterController.logoutPodcaster);

router.get('/:id', podcasterController.getPodcasterProfile);
router.get('/', podcasterController.getAllPodcasters);
module.exports = router;
