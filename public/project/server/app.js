"use strict";

module.exports = function(app) {

    var userModel = require("./models/user.model.js")();
    require("./services/user.service.server.js")(app, userModel);

    var movieModel = require("./models/movie.model.js")();
    require("./services/movie.service.server.js")(app, movieModel,userModel);
    //require("./services/field.service.server.js")(app, formModel);

};