const express = require('express');
const db = require('./models');
const env = require('dotenv');
const dbConnect = require('./dbConnect');
const authRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/admin/category');
const refreshTokenRoutes = require('./routes/refreshToken');
const authMiddleware = require('./middlewares/auth');

// express app
const app = express();

env.config();
dbConnect();

// parse JSON payloads 
app.use(express.json());

// admin routes
app.use('/api/admin',authRoutes);
app.use('/api/admin', authMiddleware ,categoryRoutes);

app.all('/', async(req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.listen(process.env.PORT || 3000)