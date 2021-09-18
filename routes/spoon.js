var express = require('express');
var router = express.Router();
var axios = require('axios');

const SPOONKEY = process.env.spoon;
/* GET Recpie from API */
router.get('/', async (req, res) => {
    var ingstr = '';
    if (Object.keys(req.body).length > 1 || ingstr != ''){
        for (let i = 0; i < Object.keys(req.body).length; i++) {
            if (ingstr == ''){
                ingstr = ingstr + req.body[i];
            }
            else{
            ingstr = ingstr + ',' + req.body[i];
            console.log(ingstr);
            }
        } 
    }
    else if ((Object.keys(req.body).length == 1)){
        ingstr = req.body[0];
        console.log(ingstr);
    }
    const APIcall = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingstr}&number=10&ranking=2&apiKey=${SPOONKEY}`;
    try {
        const ingredientSearchResult = await axios({
            method: 'get',
            url: APIcall
        });
        var recipeArray = ingredientSearchResult.data.map(info => {
            return [info.title, info.image];
        });
    } catch (err) {
        console.log("error connecting with spoon", err);
    }
    res.send(recipeArray); //returns the json of the recipies based on least missing ingredients
});

module.exports = router;