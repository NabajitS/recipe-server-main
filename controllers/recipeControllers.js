const Recipe = require('../models/recipeModel')
const fs = require("fs")


const getAllRecipes = async (req, res) => {
    try {
        const search = req.query.search || "";

        const Recipes = await Recipe.find({title:{$regex:search, $options:"i"}}).sort({ createdAt: -1 }).limit(5)
        res.status(200).json({
            Recipes: Recipes
        })
    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
}


//Get a Users own Recipes
const getUserRecipes = async (req, res) => {
    try {
        const user_id = req.user._id;
        const Recipes = await Recipe.find({ user_id: user_id }).sort({ createdAt: -1 })
        res.status(200).json({
            Recipes: Recipes
        })
    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
}


const createRecipe = async (req, res) => {
    try {
        const { title, body } = req.body;
        const user_id = req.user._id;
        const user_email = req.user.email;
        const img = {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: "image/png"
        }
        const recipe = await Recipe.create({ title: title, body: body, img: img, user_id: user_id, user_email: user_email })

        res.status(200).json({
            recipe: recipe
        })

    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
}


//Get a single Recipe
const getRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        const recipe = await Recipe.findById(id);
        res.status(200).json({
            recipe: recipe
        })

    } catch (error) {
        res.status(404).json({
            error: error
        })
    }
}

module.exports = { getRecipe, getUserRecipes, createRecipe, getAllRecipes }

