var express = require('express');
var router = express.Router();
var axios = require('axios');

const SPOONKEY = process.env.spoon;
/* GET Recpie from API */

router.post('/', async (req, res) => {

    var ingstr = '';
    if (Object.keys(req.body[1]).length > 1 || ingstr != '') {
        for (let i = 0; i < Object.keys(req.body).length; i++) {
            if (ingstr == '') {
                ingstr = ingstr + req.body[1][i];
            }
            else {
                ingstr = ingstr + ',' + req.body[1][i];
            }
        }
    }
    else if ((Object.keys(req.body[1]).length == 1)) {
        ingstr = req.body[1][0];
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
    Regional.sync({
        force: true,
    })
        .then(function () {
            for (let i = 0; i < recipeArray.length; i++) {
                return Regional.bulkCreate([
                    {
                        region: req.body[0],
                        recipe: recipeArray[i][0],
                    },
                ])
            }
        });
        /*
        .then(function () {
            // Retrieve accounts.
            return Regional.findAll();
        })
        .then(function (regions) {
            // Print out the balances.
            regions.forEach(function (region) {
                console.log(region.recipe + " " + region.region);
            });
        });*/
});

module.exports = router;