var express = require('express');
var router = express.Router();

// Require controller modules
var venue_controller = require('../controllers/venueController');
var activity_controller = require('../controllers/activityController');

router.get('/', function(req, res, next) {
  res.render('data-entry', { title: 'Itinero Data Entry Home' });
});

/* Venue search */
router.get('/venues/search', venue_controller.venue_search_get);
router.post('/venues/search', venue_controller.venue_search_post);
/* Venue creation */
router.get('/venues/create', venue_controller.venue_create_get);
router.post('/venues/create', venue_controller.venue_create_post);

/* Venue details */
router.get('/venues/:venueID', venue_controller.venue_detail_get);

/* Search Venues*/
router.get('/activities/search', activity_controller.activity_search_get);
router.post('/activities/search', activity_controller.activity_search_post);

/* Activity details */
router.get('/activities/:recreationID', activity_controller.activity_detail_get);

module.exports = router;
