var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/data', (req, res) => {
  res.json({
    status: 200,
    data: [1, 2, 3, 4, 5, 6, 7]
  })
});

module.exports = router;
