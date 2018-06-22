var models = require('../models/index');
const Op = models.Sequelize.Op

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Process venue search results
exports.data_search_post = [
    // Validate name field not empty, sanitize
    body('search_query', 'Error: Nothing was searched.').isLength({ min: 1 }).trim(),
    sanitizeBody('search_query').trim().escape(),
    // Process request
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            /* Later fix this to just not send form on front end */
            res.render('data-entry', {
                title: 'Data Entry'
            });
        } else {
            search_query = req.body.search_query;
            search_results = [];
            search_results.push(searchVenues(search_query));
            search_results.push(searchActivities(search_query));
            Promise.all(search_results).then(values => {
                mappedResults = {
                        "VENUES": values[0],
                        "ACTIVITIES": values[1]
                    };
                // no search results
                if (values[0].length == 0 && values[1].length == 0) {
                    mappedResults = false;
                }
                res.render('data-entry', {
                        title: 'Data Entry',
                        query: search_query,
                        results: mappedResults
                    });
            }).catch(error => {
                res.render('error', {
                        error: error,
                        message: error.message
                    });
            });
        }
    }
]

var searchVenues = function (query) {
    return new Promise(function(resolve, reject) {
        data = models.VENUE.findAll({
            where: {
                [Op.or]: [
                    { venueName: { [Op.like]: '%' + query + '%' } },
                    { googlePlaceID: query }
                ]
            }
        }).then(results => {
            resolve(results);
        }).catch(error => {
            reject(error);
        });
    });
}
var searchActivities = function (query) {
    return new Promise(function(resolve, reject) {
        data = models.RECREATION.findAll({
            where: {
                recreationName: { [Op.like]: '%' + query + '%' }
            }
        }).then(results => {
            resolve(results);
        }).catch(error => {
            reject(error);
        });
    });
}