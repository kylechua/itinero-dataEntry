var models = require('../models/index');
const Op = models.Sequelize.Op

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Process venue search results
exports.data_search_post = [
    // Validate name field not empty, sanitize
    body('search_query', 'Erorr: Nothing was searched.').isLength({ min: 1 }).trim(),
    sanitizeBody('search_query').trim().escape(),
    // Process request
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
        } else {
            console.log(req.body.search_query);
        }
    }
]