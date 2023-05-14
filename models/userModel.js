const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error('Needs email and password')
    }

    if (!validator.isEmail(email)) {
        throw Error('email invalid')
    }

    //If email already exists throw error
    const userTemp = await this.findOne({ email: email });
    console.log(userTemp)
    if (userTemp) {
        throw Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email: email, password: hash })
    return user;
}

UserSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Needs email and password');
    }

    if (!validator.isEmail(email)) {
        throw Error('email invalid')
    }

    //If email does not already exist throw error
    const userTemp = await this.findOne({ email: email });
    console.log(userTemp)
    if (!userTemp) {
        throw Error("Email doesn't exist")
    }

    const match = await bcrypt.compare(password, userTemp.password);

    if (!match) {
        throw Error("Incorrect Password")
    }

    return userTemp;
}


module.exports = mongoose.model('User', UserSchema);