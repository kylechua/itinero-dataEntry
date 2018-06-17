var express = require('express');
var router = express.Router();

// Require controller modules
var venue_controller = require('../controllers/venueController');

router.get('/', function(req, res, next) {
  res.render('data-entry', { title: 'Itinero Data Entry Home' });
});

/* Load venues page */
router.get('/venues/', function(req, res, next) {
  res.render('_data-entry/venues', { title: 'Venues - Itinero'});
});

router.post('/venues/search/', venue_controller.venue_search_post);

module.exports = router;
