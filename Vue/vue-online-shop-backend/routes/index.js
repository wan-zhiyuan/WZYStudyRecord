var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' }); // 加载index.jade模板，并且title值为Express
});

module.exports = router;
