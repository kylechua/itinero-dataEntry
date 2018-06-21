var express = require('express');
var router = express.Router();

// Require controller modules
var data_controller = require('../controllers/dataController');
var venue_controller = require('../controllers/venueController');
var activity_controller = require('../controllers/activityController');

// Retrieve Data Entry Home Page
router.get('/', function(req, res, next) {
  res.render('data-entry', { title: 'Data Entry' });
});
// Retrieve Search Results
router.post('/', data_controller.data_search_post);

/* Venue search */
router.get('/venues/search', venue_controller.venue_search_get);
router.post('/venues/search', venue_controller.venue_search_post);
/* Venue creation */
router.get('/venue/create', venue_controller.venue_create_get);
router.post('/venue/create', venue_controller.venue_create_post);

/* Venue details */
router.get('/venues/:venueID', venue_controller.venue_detail_get);

/* Search Venues*/
router.get('/activities/search', activity_controller.activity_search_get);
router.post('/activities/search', activity_controller.activity_search_post);

/* Search Venues*/
router.get('/activity/create', activity_controller.activity_search_get);
router.post('/activity/create', activity_controller.activity_search_post);

/* Activity details */
router.get('/activities/:recreationID', activity_controller.activity_detail_get);

/* Search */
router.post('/search', data_controller.data_search_post);

module.exports = router;
