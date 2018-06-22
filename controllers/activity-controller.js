var models = require('../models/index');
const Op = models.Sequelize.Op

const { check,body,validationResult } = require('express-validator/check');
const { matchedData,sanitize,sanitizeBody } = require('express-validator/filter');

// Load activity search
exports.activity_search_get = function(req, res, next) {
    res.render('_data-entry/activity_search', { title: 'Activity Search' });
}

// Process activity search results
exports.activity_search_post = [
    // Validate name field not empty, sanitize
    body('name', 'Activity name required.').isLength({ min: 1 }).trim(),
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
    var id = parseInt(req.params.recreationID);
    data = models.RECREATION.find({
            where: { recreationID: id },
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
                res.render('details', {
                        id: id,
                        type: "Activity",
                        info: info,
                        Venue: venue,
                        ItineraryList: itins 
                    });
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

exports.activity_create_post = [
    // Validate form
    check('recreationName').trim().isLength({ min: 1, max: 50}).withMessage('Activity name must be between 1-50 characters.'),
    check('activityShortDescription').trim().isLength({ min:1, max: 100 }).withMessage("Short description must be between 1-100 characters."),
    check('recreationName').trim().escape(),
    check('recreationLast').trim().escape().toInt(),
    check('reservation').trim().escape().toInt(),
    check('21andUp').trim().escape().toInt(),
    check('adventure').trim().escape().toInt(),
    check('outdoor').trim().escape().toInt(),
    check('laidback').trim().escape().toInt(),
    check('romantic').trim().escape().toInt(),
    check('kidFriendly').trim().escape().toInt(),
    check('cultural').trim().escape().toInt(),
    check('activityLevel').trim().escape().toInt(),
    check('monday').trim().escape().toInt(),
    check('tuesday').trim().escape().toInt(),
    check('wednesday').trim().escape().toInt(),
    check('thursday').trim().escape().toInt(),
    check('friday').trim().escape().toInt(),
    check('saturday').trim().escape().toInt(),
    check('sunday').trim().escape().toInt(),
    check('weatherValidity').trim().escape().toInt(),
    check('winter').trim().escape().toInt(),
    check('spring').trim().escape().toInt(),
    check('summer').trim().escape().toInt(),
    check('fall').trim().escape().toInt(),
    check('activityStartTime').trim().escape(),
    check('activityEndTime').trim().escape(),
    check('minParticipants').trim().escape().toInt(),
    check('maxParticipants').trim().escape().toInt(),
    check('minDuration').trim().escape().toInt(),
    check('maxDuration').trim().escape().toInt(),
    check('minCost').trim().escape().toInt(),
    check('maxCost').trim().escape().toInt(),
    check('activityShortDescription').trim().escape(),
    check('activityFullDescription').trim().escape(),
    check('activityImageURL').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() })
        } else {
            var venueID = parseInt(req.params.venueID);
            var data = matchedData(req);
            if (!data.activityImageURL.length > 0) {
                data.activityImageURL = null;
            }
            if (data.activityStartTime.length > 0) {
                var start = parseInt(data.activityStartTime)
                if (!isNaN(start)) data.activityStartTime = start;
                else data.activityStartTime = null;
            }
            if (data.activityEndTime.length > 0) {
                var end = parseInt(data.activityEndTime)
                if (!isNaN(end)) data.activityEndTime = end;
                else data.activityEndTime = null;
            }
            var recreation = models.RECREATION.build({
                venueID: venueID,
                recreationName: data.recreationName,
                minDuration: data.minDuration,
                maxDuration: data.maxDuration,
                minCost: data.minCost,
                maxCost: data.maxCost,
                recreationLast: !!+data.recreationLast,
                timestart: data.activityStartTime,
                timefinish: data.activityEndTime,
                minParticipant: data.minParticipants,
                maxParticipant: data.maxParticipants,
                weatherValidity: data.weatherValidity,
                winterValidity: data.winter,
                springValidity: data.spring,
                summerValidity: data.summer,
                fallValidity: data.fall,
                reservationRequired: !!+data.reservation,
                activityLevel: data.activityLevel,
                shortformDescription: data.activityShortDescription,
                "21andUp": data["21andUp"],
                fullDescription: data.activityFullDescription,
                photoURL: data.activityImageURL
            });
            recreation.save().then(result => {
                activityID = result.recreationID;
                res.redirect('/data-entry/venue/' + venueID + '?success=' + activityID);
            }).error(err => {
                console.log(err)
            });
        }
    }
]

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)? (\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}