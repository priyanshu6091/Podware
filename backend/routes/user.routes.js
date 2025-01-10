const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authUser.middleware');
const { authorize } = require('../middlewares/authorize');

router.post('/signup', [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
        userController.registerUser
    )


router.post('/signin', [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
        userController.loginUser
);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.put('/update', authMiddleware.authUser, [
        body('fullname.firstname').optional().isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('fullname.lastname').optional().isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
        body('email').optional().isEmail().withMessage('Invalid Email'),
        body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
        userController.updateUser
);

router.post('/logout', authorize(['User']), userController.logoutUser);

router.get('/rewards', authorize(['User']), userController.getUserRewards);

module.exports = router;
