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
            data = models.recreation.findAll({
                    where: {
                        recreationname: { [Op.like]: '%' + name + '%' }
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
    var id = parseInt(req.params.recreationid);
    data = models.recreation.find({
            where: { recreationid: id },
            include: [
                //{ all: true }
                { model: models.venue, as: 'Venue' },
                { model: models.itinerary, as: 'ItineraryList' }
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
    check('recreationName').isLength({ min: 1, max: 50}).withMessage('Activity name must be between 1-50 characters.'),
    check('activityShortDescription').isLength({ min:1, max: 100 }).withMessage("Short description must be between 1-100 characters."),
    check('recreationLast').isIn(['0', '1']),
    check('reservation').isIn(['0', '1']),
    check('21andUp').isIn(['0', '1']),
    check('adventure').isInt(),
    check('outdoor').isInt(),
    check('laidback').isInt(),
    check('romantic').isInt(),
    check('kidFriendly').isInt(),
    check('cultural').isInt(),
    check('activityLevel').isInt(),
    check('monday').optional().isIn(['0', '1']),
    check('tuesday').optional().isIn(['0', '1']),
    check('wednesday').optional().isIn(['0', '1']),
    check('thursday').optional().isIn(['0', '1']),
    check('friday').optional().isIn(['0', '1']),
    check('saturday').optional().isIn(['0', '1']),
    check('sunday').optional().isIn(['0', '1']),
    check('weatherValidity').isInt(),
    check('winter').optional().isIn(['0', '1']),
    check('spring').optional().isIn(['0', '1']),
    check('summer').optional().isIn(['0', '1']),
    check('fall').optional().isIn(['0', '1']),
    check('activityStartTime').optional().exists(),
    check('activityEndTime').optional().exists(),
    check('minParticipants').isInt(),
    check('maxParticipants').isInt(),
    check('minDuration').isInt(),
    check('maxDuration').isInt(),
    check('minCost').isInt(),
    check('maxCost').isInt(),
    check('activityFullDescription').optional().isLength({max: 1000 }),
    check('activityImageURL').optional().isLength({max: 8000 }),
    sanitize('recreationName').trim().escape(),
    sanitize('activityShortDescription').trim().escape(),
    sanitize('recreationLast').toInt(),
    sanitize('reservation').toInt(),
    sanitize('21andUp').toInt(),
    sanitize('adventure').toInt(),
    sanitize('outdoor').toInt(),
    sanitize('laidback').toInt(),
    sanitize('romantic').toInt(),
    sanitize('kidFriendly').toInt(),
    sanitize('cultural').toInt(),
    sanitize('activityLevel').toInt(),
    sanitize('monday').toInt(),
    sanitize('tuesday').toInt(),
    sanitize('wednesday').toInt(),
    sanitize('thursday').toInt(),
    sanitize('friday').toInt(),
    sanitize('saturday').toInt(),
    sanitize('sunday').toInt(),
    sanitize('weatherValidity').toInt(),
    sanitize('winter').toInt(),
    sanitize('spring').toInt(),
    sanitize('summer').toInt(),
    sanitize('fall').toInt(),
    sanitize('minParticipants').toInt(),
    sanitize('maxParticipants').toInt(),
    sanitize('minDuration').toInt(),
    sanitize('maxDuration').toInt(),
    sanitize('minCost').toInt(),
    sanitize('maxCost').toInt(),
    sanitize('activityFullDescription').trim().escape(),
    sanitize('activityImageURL').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() })
        } else {
            var venueID = parseInt(req.params.venueid);
            var data = matchedData(req);
            if (!data.activityImageURL.length > 0) {
                data.activityImageURL = '\N';
            }
            var start = parseInt(data.activityStartTime)
            if (!isNaN(start)) {
                data.activityStartTime = start;
            } else {
                data.activityStartTime = null;
            }
            var end = parseInt(data.activityEndTime)
            if (!isNaN(end)) {
                data.activityEndTime = end;
            } else {
                data.activityEndTime = null;
            }
            var recreation = models.recreation.build({
                venueid: venueID,
                recreationname: data.recreationName,
                minduration: data.minDuration,
                maxduration: data.maxDuration,
                mincost: data.minCost,
                maxcost: data.maxCost,
                recreationlast: !!+data.recreationLast,
                timestart: data.activityStartTime,
                timefinish: data.activityEndTime,
                minparticipant: data.minParticipants,
                maxparticipant: data.maxParticipants,
                weathervalidity: data.weatherValidity,
                wintervalidity: data.winter,
                springvalidity: data.spring,
                summervalidity: data.summer,
                fallvalidity: data.fall,
                reservationrequired: !!+data.reservation,
                activitylevel: data.activityLevel,
                shortformdescription: data.activityShortDescription,
                "21andUp": data["21andUp"],
                fulldescription: data.activityfullfescription,
                photourl: data.activityImageURL
            });
            recreation.save().then(result => {
                var recreationid = parseInt(result.dataValues.recreationid);
                console.log("Activity ID: " + result.dataValues.recreationid)
                var recreation_days = models.recreation_days.build({
                    recreationid: recreationid,
                    monday: !!+data.monday,
                    tuesday: !!+data.tuesday,
                    wednesday: !!+data.wednesday,
                    thursday: !!+data.thursday,
                    friday: !!+data.friday,
                    saturday: !!+data.saturday,
                    sunday: !!+data.sunday
                });
                var adventure = models.recreation_mood.build({
                    recreationid: recreationid,
                    mood: 'Adventure',
                    rank: data.adventure
                });
                var cultural = models.recreation_mood.build({
                    recreationid: recreationid,
                    mood: 'Cultural',
                    rank: data.cultural
                });
                var kidFriendly = models.recreation_mood.build({
                    recreationid: recreationid,
                    mood: 'Kid Friendly',
                    rank: data.kidFriendly
                });
                var laidback = models.recreation_mood.build({
                    recreationid: recreationid,
                    mood: 'Laid Back',
                    rank: data.laidback
                });
                var romantic = models.recreation_mood.build({
                    recreationid: recreationid,
                    mood: 'Romantic',
                    rank: data.romantic
                });
                var outdoors = models.recreation_mood.build({
                    recreationid: recreationid,
                    mood: 'Outdoors',
                    rank: data.outdoor
                });
                var todo = []
                todo.push(recreation_days.save())
                todo.push(adventure.save())
                todo.push(cultural.save())
                todo.push(kidFriendly.save())
                todo.push(laidback.save())
                todo.push(romantic.save())
                todo.push(outdoors.save())
                Promise.all(todo).then(values => {
                    res.redirect('/data-entry/venue/' + venueID + '?success=' + recreationid);
                }).catch(error => {
                    console.log(error)
                });
            }).catch(error => {
                console.log(error)
            });
        }
    }
]

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)? (\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}