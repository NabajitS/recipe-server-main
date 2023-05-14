const express = require("express");
const { getAllRecipes, getUserRecipes, createRecipe, getRecipe } = require('../controllers/recipeControllers')
const multer = require("multer");
const { checkAuth } = require("../middleware/checkAuth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const router = express.Router();



//Get User Recipes
// router.get('/', getUserRecipes)
router.get('/', getAllRecipes)

router.use(checkAuth)


//Get a particular users own Recipes
router.get('/own-recipes', getUserRecipes)


//Post or Create new Recipe
router.post('/', upload.single('testImage'), createRecipe)



//Get a single Recipe
router.get('/:id', getRecipe);

module.exports = router