// Dependencies
const express = require('express');
const app = express();
global.Promise = require('bluebird')
const bodyParser = require('body-parser');
require('dotenv').config();

const gumUtil = require('./gum/util.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/gum', (req, res, next) => {
    gumUtil.validateUserByGuid('tschubiger002').then(user => res.send(user)).catch(err => res.status(400).send(err))
});

// Start Server
app.listen(1338, () => console.log('API is running on port ' + 1338));