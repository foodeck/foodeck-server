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
  console.log(req.files)
  var final_res = [];
  for (var i = 0; i<req.files.length; i++){
    const [result] = await client.labelDetection(req.files[i].buffer);
    var label_final = [];
    for (var j=0; j<result.labelAnnotations.length; j++){
      const labels = result.labelAnnotations[j].description;
      const score = result.labelAnnotations[j].score;
      const temp = {'description': labels, 'score': score}
      label_final.push(temp);
    }
    final_res = final_res.concat(label_final);
  }
  var return_res = {"result": final_res}
  res.send(return_res)
});

module.exports = router;
