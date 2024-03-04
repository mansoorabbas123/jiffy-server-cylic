const express = require('express');
const env = require('dotenv');
const { dbConnect, db } = require('./dbConnect');
const user = require('./models/user');
const authRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/admin/category');
const refreshTokenRoutes = require('./routes/refreshToken');
const authMiddleware = require('./middlewares/auth');
const cors = require('cors');

// express app
const app = express();

env.config();
dbConnect()

// allow cors
app.use(cors());
// parse JSON payloads 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// admin routes
app.use('/api/admin', authRoutes);
app.use('/api/admin', authMiddleware, categoryRoutes);

app.all('/', async (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.listen(process.env.PORT || 3000)