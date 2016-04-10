"use strict";

module.exports = function(app,mongoose,db) {

    var userModel = require("./models/user.model.js")(mongoose,db);
    require("./services/user.service.server.js")(app, userModel);

    var movieModel = require("./models/movie.model.js")(mongoose,db);
    require("./services/movie.service.server.js")(app, movieModel);

    var eventModel = require("./models/event.model.js")(mongoose,db);
    require("./services/movie.service.server.js")(app, eventModel);

};