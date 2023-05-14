const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    const token = jwt.sign({ id: id }, process.env.SECRET, { expiresIn: '3d' });
    return token;
}


const signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.signup(email, password);

        const token = createToken(user._id)
        res.status(200).json({
            email: user.email,
            token: token
        })
    }
    catch (err) {
        res.status(401).json({ err: err.message })
    }
}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(200).json({
            email: user.email,
            token: token
        })

    } catch (err) {
        res.status(404).json({ err: err.message })
    }
}

module.exports = { signupUser, loginUser }