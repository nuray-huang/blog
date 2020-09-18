const express = require('express');
const home = express.Router();
home.get('/', (req, res) => {
    res.send('首页')
});
module.exports = home;