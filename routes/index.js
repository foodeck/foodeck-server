var express = require('express');
var router = express.Router();
const multer = require('multer');
var upload = multer({ dest: 'storage/' })
const { path } = require('../app');

// var storage = multer.diskStorage({
//   destination: './storage/',
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// })

// const upload = multer({
//   storage: storage
// }).single();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/upload', function (req, res) {
//   upload(req, res, (err) => {
//     if (err) {
//       res.render('index', {
//         msg: err
//       });
//     } else {
//       console.log(req.file);
//       res.send('test');
//     }
//   });
// });

router.post('/ay', upload.array('file', 12), function (req, res, next) {
  console.log(req.files)
  res.send("done");
});

module.exports = router;
