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
router.post('/upload', upload.single('file'), async function (req, res) {
  const [result] = await client.labelDetection(req.file.buffer);
  res.send(result);
});

module.exports = router;
