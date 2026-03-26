const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route');
const chatRoutes = require('./routes/chat.routes');
const path = require('path');
const cors = require('cors');
const app = express();

// using middleWares ------------>
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly add OPTIONS
    credentials: true
}));

// using Routes --------------->
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);


app.get('*name', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = app;