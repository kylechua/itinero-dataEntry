var models = require('../models/index');
const Op = models.Sequelize.Op

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Load venue details for given ID
exports.venue_detail_get = function(req, res, next) {
    id = parseInt(req.params.venueID);
    data = models.VENUE.find({
            where: { venueID: id },
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
                res.render('details', {
                    id: id,
                    type: "venue",
                    info: results.dataValues,
                    Recreations: recs } );
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
};

exports.venue_create_get = function(req, res, next) {
    res.render('_data-entry/venue_create', { title: 'Create a Venue' });
};

exports.venue_create_post = function(req, res, next) {
    res.render('_data-entry/venue_create', { title: 'Create a Venue' });
};