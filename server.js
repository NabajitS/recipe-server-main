const express = require('express');
const recipeRouter = require('./routes/recipeRoutes');
const userRouter = require('./routes/userRoutes');
const mongoose = require('mongoose')
const cors = require("cors");

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())

const URI = 'mongodb+srv://greenteabag:NZ8OKq4Kn3sUxMgw@green.khp1qxy.mongodb.net/recipes?retryWrites=true&w=majority'

mongoose.connect(URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & Server running on port ', process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err)
    })


app.use('/api/recipes', recipeRouter);
app.use('/api/users', userRouter);

