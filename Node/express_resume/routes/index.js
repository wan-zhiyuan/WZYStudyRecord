const express = require('express');
const router = express.Router(); // 子路由

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;