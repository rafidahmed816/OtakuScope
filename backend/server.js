const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const statsRoutes = require ('./routes/statsRoutes.js');
const animeRoutes = require('./routes/animeRoutes');
const listRoutes = require('./routes/listRoutes');
const { checkConnection } = require('./config/db');
const verifyToken = require('./middleware/authMiddleware')
const reviewRoutes = require('./routes/reviewRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', statsRoutes);
app.use('/api/anime', verifyToken, animeRoutes); 
app.use('/api/lists',verifyToken, listRoutes); 
app.use('/api/reviews', reviewRoutes);
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Check DB connection on startup
(async () => {
    try {
        await checkConnection();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1); // Exit if DB connection fails
    }
})();
