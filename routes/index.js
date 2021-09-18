var express = require('express');
var router = express.Router();
const multer = require('multer');
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
  keyFilename: './apik.json'
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
router.post('/upload', upload.any(), async function (req, res, next) {
  const imageProcess = require('../helpers/imageProcess.js');
  var return_res = await imageProcess.imageToLabels(req,client);
  res.send(return_res)
});

module.exports = router;
