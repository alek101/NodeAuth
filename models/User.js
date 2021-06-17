const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, 'Please enter an email'], 
        unique: true, 
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minumum password length is 6 character']
    }
})

//fire a function after doc saved to db

userSchema.post('save', function(doc, next) {
    console.log('new user was created and saved', doc)
    next()
})

//fire a function before doc saved to db
//this is releted to the user instance
userSchema.pre('save', function(next) {
    console.log('user about to be created & saved', this)

    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;