'use strict';
require('express-async-errors');
const error = require('./middleware/error.js');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const users = require('./routes/users');
const auth = require('./routes/auth');
const fileRoutes = require('./routes/file-upload-routes');

const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/wlae')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/file', fileRoutes);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));