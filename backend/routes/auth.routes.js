const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const passport = require('../middlewares/auth.google'); // Ensure this middleware is properly configured
const auth = require('../middlewares/auth');
const ath = require('../middlewares/authorize');
const router = express.Router();

router.post('/signup', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long')
], authController.signUp);

router.post('/signin', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], authController.signIn);

router.get('/me', ath.authorize(['Admin', 'User', 'Podcaster']), authController.getCurrentUser);

router.put('/update-profile', auth.authenticate, authController.updateUserProfile);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/signin' }),
    authController.googleCallback
);

module.exports = router;
