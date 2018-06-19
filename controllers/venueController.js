var models = require('../models/index');
const Op = models.Sequelize.Op

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Load venue search
exports.venue_search_get = function(req, res, next) {
    res.render('_data-entry/venue_search', { title: 'Venue Search' });
}

// Process venue search results
exports.venue_search_post = [
    // Validate name field not empty, sanitize
    body('name', 'Erorr: Venue name required.').isLength({ min: 1 }).trim(),
    sanitizeBody('name').trim().escape(),
    // Process request
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('_data-entry/venue_search', { title: 'Venue Search', errors: errors.array() });
        } else {
            name = req.body.name;
            data = models.VENUE.findAll({
                    where: {
                        [Op.or]: [
                            { venueName: { [Op.like]: '%' + name + '%' } },
                            { googlePlaceID: name }
                        ]
                    }
                }).then(results => {
                    if (results.length > 0) {
                        res.render('_data-entry/venue_search', { title: 'Venue Search', searchQuery: name, results: results })
                    } else {
                        var errors = Array()
                        errors.push({ msg: 'No results found for "' + req.body.name + '".'})
                        res.render('_data-entry/venue_search', { title: 'Venue Search', errors: errors })
                    }
                }).catch(error => {
                    res.send(error)
                });
        }
    }
]

// Load venue details for given ID
exports.venue_detail_get = function(req, res, next) {
    data = models.VENUE.find({
            where: { venueID: parseInt(req.params.venueID) },
            include: [
                { model: models.RECREATION, as: 'Recreations' }
            ]
        }).then(results => {
            if (results.dataValues) {
                info = results.dataValues;
                var recs = false;
                if (info["Recreations"]) {
                    recs = info["Recreations"];
                    delete info["Recreations"];
                }
                res.render('_data-entry/venue_details', { info: results.dataValues, Recreations: recs } );
            } else throw Error();
        }).catch(error => {
            console.log(error)
            res.render('error', {
                    message: "Oops... we can't find that venue",
                    error: {
                        status: "404 Not Found",
                        stack: error
                    }
                });
        });
}