const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');

// Set up middleware
app.use(volleyball)
app.use(express.json());

// Set up routes
app.use('/api', require('./api'));

// Pass back everything else / front-end
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../static/index.html')));

module.exports = app;
