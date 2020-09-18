const express = require('express');

const admin = express.Router();
const session = require('express-session');
admin.get('/login', require('./admin/loginPage'));
admin.post('/login', require('./admin/login'));
admin.get('/user', require('./admin/userPage'));
admin.get('/article', (req, res) => {
    res.render('admin/article')
});
admin.get('/article-edit', (req, res) => {
    res.render('admin/article-edit')
});
admin.get('/user-edit', require('./admin/user-edit'));
admin.post('/user-edit', require('./admin/user-edit-fn'));

module.exports = admin;