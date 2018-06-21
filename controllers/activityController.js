var models = require('../models/index');
const Op = models.Sequelize.Op

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Load activity search
exports.activity_search_get = function(req, res, next) {
    res.render('_data-entry/activity_search', { title: 'Activity Search' });
}

// Process activity search results
exports.activity_search_post = [
    // Validate name field not empty, sanitize
    body('name', 'Erorr: Activity name required.').isLength({ min: 1 }).trim(),
    sanitizeBody('name').trim().escape(),
    // Process request
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('_data-entry/activity_search', { title: 'Activity Search', errors: errors.array() });
        } else {
            name = req.body.name;
            data = models.RECREATION.findAll({
                    where: {
                        recreationName: { [Op.like]: '%' + name + '%' }
                    }
                }).then(results => {
                    if (results.length > 0) {
                        res.render('_data-entry/activity_search', { title: 'Activity Search', searchQuery: name, results: results })
                    } else {
                        var errors = Array()
                        errors.push({ msg: 'No results found for "' + req.body.name + '".'})
                        res.render('_data-entry/activity_search', { title: 'Activity Search', errors: errors })
                    }
                }).catch(error => {
                    res.send(error);
                });
        }
    }
]

// Load activity details for given ID
exports.activity_detail_get = function(req, res, next) {
    data = models.RECREATION.find({
            where: { recreationID: parseInt(req.params.recreationID) },
            include: [
                //{ all: true }
                { model: models.VENUE, as: 'Venue' },
                { model: models.ITINERARY, as: 'ItineraryList' }
            ]
        }).then(results => {
            if (results.dataValues) {
                info = results.dataValues;
                var venue = false;
                var itins = false;
                if (info["Venue"]) {
                    venue = info["Venue"];
                    delete info["Venue"];
                }
                if (info["ItineraryList"]) {
                    itins = info["ItineraryList"];
                    itins = info["ItineraryList"];
                }
                res.render('_data-entry/activity_details', { info: info, Venue: venue, ItineraryList: itins } );
            } else throw Error();
        }).catch(error => {
            console.log(error)
            res.render('error', {
                    message: "Oops... we can't find that activity",
                    error: {
                        status: "404 Not Found",
                        stack: error
                    }
                });
        });
}