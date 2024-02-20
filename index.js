const express = require('express');
const db = require('./models');
const env = require('dotenv');
const dbConnect = require('./dbConnect');
const authRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/admin/category');
const refreshTokenRoutes = require('./routes/refreshToken');

// express app
const app = express();

env.config();
dbConnect();

app.use(express.json());

// admin routes
app.use('/api/admin',authRoutes);
app.use('/api/admin',categoryRoutes);

app.all('/', async(req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.listen(process.env.PORT || 3000)