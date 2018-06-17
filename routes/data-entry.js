var express = require('express');
var router = express.Router();

// Require controller modules
var venue_controller = require('../controllers/venueController');

router.get('/', function(req, res, next) {
  res.render('data-entry', { title: 'Itinero Data Entry Home' });
});

/* Load venues page */
router.get('/venues/search', venue_controller.venue_search_get);
router.post('/venues/search', venue_controller.venue_search_post);

/* Venue details */
router.get('/venues/:venueID', venue_controller.venue_detail_get);

module.exports = router;
