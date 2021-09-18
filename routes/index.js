var express = require('express');
var router = express.Router();
const multer = require('multer');
const vision = require('@google-cloud/vision');
const imageProcess = require('../helpers/imageProcess.js');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const foodlist = require('../inglist/Spooning.json');

const client = new vision.ImageAnnotatorClient({
  keyFilename: './apik.json'
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Allow upload of images
router.post('/upload', upload.any(), async function (req, res, next) {
  var return_res = await imageProcess.imageToLabels(req, client, foodlist);
  res.send(return_res)
});

module.exports = router;
