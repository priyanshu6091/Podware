const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/authAdmin.middleware');
const { authorize } = require('../middlewares/authorize');
router.post('/register', [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
        adminController.registerAdmin
    )


router.post('/login', [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
        adminController.loginAdmin
);

router.get('/profile', authorize(['Admin']), adminController.getAdminProfile);

router.get('/logout', authorize(['Admin']), adminController.logoutAdmin);


module.exports = router;
