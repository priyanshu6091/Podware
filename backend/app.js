const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./middlewares/auth.google');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const podcastRoutes = require('./routes/podcast.routes');
const episodeRoutes = require('./routes/episode.routes');
const rewardRoutes = require('./routes/reward.routes');
const questionRoutes = require('./routes/question.routes');
const reelRoutes = require('./routes/reel.routes');
const dotenv = require('dotenv')
const cors = require('cors');
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend to access backend
    credentials: true
}));

app.use(session({
    secret: 'podware',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/podwareBackend';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use('/api/auth', authRoutes);
app.use('/api/podcasts', podcastRoutes);
app.use('/api/episodes', episodeRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/reels', reelRoutes);app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'), {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.mkv')) {
          res.setHeader('Content-Type', 'video/x-matroska');
        }
      },
    })
  );
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});