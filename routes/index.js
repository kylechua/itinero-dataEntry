var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dataEntry', { title: 'Data Enrty' });
});

module.exports = router;
