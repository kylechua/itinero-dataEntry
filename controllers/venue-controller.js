var models = require('../models/index');
const Op = models.Sequelize.Op

const { check,body,validationResult } = require('express-validator/check');
const { matchedData,sanitize,sanitizeBody } = require('express-validator/filter');

// Load venue details for given ID
exports.venue_detail_get = function(req, res, next) {
    id = parseInt(req.params.venueID);
    newActivityID = parseInt(req.query.success);
    if (isNaN(newActivityID)) newActivityID = null;
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
                    type: "Venue",
                    info: results.dataValues,
                    newActivityID: newActivityID,
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
    res.render('create', { type: "Venue" });
};
    
exports.venue_create_post = [
    // Validate form
    check('venueName').isLength({ min: 1, max: 50}),
    check('venueShortDescription').isLength({ min:1, max: 150 }),
    check('venueFullDescription').isLength({ min:1, max: 1000 }),
    check('googlePlaceID').exists(),
    check('petFriendly').optional().isIn(['0', '1']),
    check('food').optional().isIn(['0', '1']),
    check('drinks').optional().isIn(['0', '1']),
    check('multiactivity').optional().isIn(['0', '1']),
    check('discoverInput').isInt(),
    check('venueCategory').exists(),
    check('websiteURL').optional().isLength({max: 1000 }),
    check('venueImageURL').optional().isLength({max: 8000 }),
    sanitize('venueName').trim().escape(),
    sanitize('venueShortDescription').trim().escape(),
    sanitize('venueFullDescription').trim().escape(),
    sanitize('googlePlaceID').trim().escape(),
    sanitize('petFriendly').toInt(),
    sanitize('food').toInt(),
    sanitize('drinks').toInt(),
    sanitize('multiActivity').toInt(),
    sanitize('discoverInput').toInt(),
    sanitize('venueCategory').trim().escape(),
    sanitize('websiteURL').trim().escape(),
    sanitize('venueImageURL').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() })
        } else {
            var data = matchedData(req);
            console.log(data)
        }
    }
]