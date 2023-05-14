const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const checkAuth = async (req, res, next) => {
    //first check if token exists at all
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token not present" })

    }

    //Now check if token is intact  authorization will have token in the form - "Bearer dhfjd.dhfjnbd.dfjvdgj"

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id: id }).select('_id email')

        next();
    }
    catch (err) {
        res.status(401).json({ error: "Token not verified" })
    }


}

module.exports = { checkAuth }