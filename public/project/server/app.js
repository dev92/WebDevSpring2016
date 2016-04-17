"use strict";

module.exports = function(app,mongoose,db) {

    var userModel = require("./models/user.model.js")(mongoose,db);
    var movieModel = require("./models/movie.model.js")(mongoose,db);
    var eventModel = require("./models/event.model.js")(mongoose,db);

    require("./services/movie.service.server.js")(app, movieModel,userModel);
    require("./services/user.service.server.js")(app, userModel, movieModel);
    require("./services/movie.service.server.js")(app, eventModel);

};