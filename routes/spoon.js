var express = require('express');
var router = express.Router();
var axios = require('axios');

const SPOONKEY = process.env.spoon;
/* GET Recpie from API */

router.post('/', (req, res) => {
    var ingstr = '';
    if (Object.keys(req.body[1]).length > 1 || ingstr != '') {
        for (let i = 0; i < Object.keys(req.body[1]).length; i++) {
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
    axios({
        method: 'get',
        url: APIcall
    }).then(function (ingredientSearchResult) {
        var recipeArray = ingredientSearchResult.data.map(info => {
            return [info.title, info.image];
        });
        res.send(recipeArray);
    })
    Regional.sync({
        force: false,
    })
        .then(function () {
            for (let i = 0; i < Object.keys(req.body[1]).length; i++) {
                Regional.bulkCreate([
                    {
                        region: req.body[0],
                        recipe: req.body[1][i],
                    },
                ])
            }
        })
        .then(function () {
            return Regional.findAll();
        })
        .then(function (regions) {
            regions.forEach(function (reg) {
                console.log(reg.recipe + " " + reg.region);
            });
        })
        .catch(function (err) {
            console.log(JSON.stringify(err));
        });
});
module.exports = router;