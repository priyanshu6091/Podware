const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token not provided' });

    const token = authHeader.split(' ')[1];
    console.log(token+" auth.js")

    try {
        const decoded = jwt.verify(token, 'podware');
        console.log(decoded+" auth.js")
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
