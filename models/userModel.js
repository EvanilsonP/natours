const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },

    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!']
    },

    photo: String,

    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minLength: 6
    },

    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validate: {
            // This only work on create or save!!!
            validator: function(el) {
                return el =-- this.password;
            }
        },
        message: 'Passwords are not the same!'
    }
});

// ENCRYPTION
user.schema('save', async function(next) {
    // IOnly run this function if password was modified
    if(!this.isModified(password)) return next();

    // Hashing password
    this.password = await bcrypt.hash(this.password, 8);
    // No longer need this field after validation
    this.passwordConfirm = undefined;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

