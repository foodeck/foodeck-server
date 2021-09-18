var express = require('express');
var router = express.Router();

const SPOONKEY = "19daf48d06484bc3900df91a98bac126";
const APIcall = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingstr}&number=10&ranking=2&apiKey=${SPOONKEY}`;

/* GET Recpie from API */
router.get('/', function (req, res) {
    const ingstr = '';
    for (let i = 0; i < 'numrows of db'; i++) {
        ingstr = ingstr + 'database ingredient string' //builds the string from the cockdb when its implemented
    }
    res.send(APIcall); //returns the json of the recipies based on least missing ingredients
});

module.exports = router;