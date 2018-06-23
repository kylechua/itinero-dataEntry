var express = require('express');
var router = express.Router();

// Require controller modules
var data_controller = require('../controllers/data-controller');
var venue_controller = require('../controllers/venue-controller');
var activity_controller = require('../controllers/activity-controller');

// Retrieve Data Entry Home Page
router.get('/', function(req, res, next) {
  res.render('data-entry', { title: 'Data Entry' });
});
// Retrieve Search Results
router.post('/', data_controller.data_search_post);

/* Venue creation */
router.get('/create/venue', venue_controller.venue_create_get);
router.post('/create/venue', venue_controller.venue_create_post);

/* Venue details */
router.get('/venue/:venueID', venue_controller.venue_detail_get);
/* Create activity at venue */
router.post('/venue/:venueID/create-activity', activity_controller.activity_create_post);

/* Activity details */
router.get('/activity/:recreationID', activity_controller.activity_detail_get);

/* Redirect invalid URLs */
router.get('*', function(req, res) {
  res.redirect('/data-entry');
})

module.exports = router;
