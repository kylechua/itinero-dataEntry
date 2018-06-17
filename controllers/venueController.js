var models = require('../models/index');
const Op = models.Sequelize.Op

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.venue_search_post = [
    // Validate name field not empty, sanitize
    body('name', 'Venue name required').isLength({ min: 1 }).trim(),
    sanitizeBody('name').trim().escape(),

    // Process request
    (req, res, next) => {
        const errors = validationResult(req);
        
        /*
        data = models.VENUE.findAll({
                attributes: ['venueName'],
                where: {
                    venueName: {
                        [Op.like]: '%' + name + '%'
                    }
                }
            }).then(results => {
                res.send(results.dataValues)
            }).catch(error => {
                res.send(error)
            })
        */
    }
    
]