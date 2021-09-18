var express = require('express');
var router = express.Router();
const multer = require('multer');
const vision = require('@google-cloud/vision');
const imageProcess = require('../helpers/imageProcess.js');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const foodlist = require('../inglist/Spooning.json');
const cEmail = process.env.client_email;
const pKey = process.env.private_key.replace(/\\n/gm, '\n');
const pId = process.env.project_id;
const credentials = {
  "client_email": cEmail,
  "private_key": pKey
}

const client = new vision.ImageAnnotatorClient({
  "credentials": credentials,
  "project_id": pId
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
