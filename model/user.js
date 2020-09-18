const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const admin = require('../route/admin');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        default: 0
    }
});
const User = mongoose.model('User', userSchema);
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('112233', salt);
    const user = await User.create({
        username: 'nuray',
        email: '123456@163.cn',
        password: pass,
        role: 'admin',
        state: 0
    });
}

createUser();

const validateUser = user => {
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式错误')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合规则')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };
    return Joi.validate(user, schema);
}

module.exports = {
    User,
    validateUser
}