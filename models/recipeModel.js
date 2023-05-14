const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
    user_id: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('recipecollection', RecipeSchema)