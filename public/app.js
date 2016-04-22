"use strict";

module.exports = function(app,mongoose,db) {


    //Assignment

    var asgmtuserModel = require("../public/assignment/server/models/user.model.js")(mongoose,db);
    require("../public/assignment/server/services/user.service.server.js")(app, asgmtuserModel);

    var formModel = require("../public/assignment/server/models/form.model.js")(mongoose,db);
    require("../public/assignment/server/services/form.service.server.js")(app, formModel);

    var fieldModel = require("../public/assignment/server/models/field.model.js")(mongoose,db);
    require("../public/assignment/server/services/field.service.server.js")(app, fieldModel);

    //Project

    var userModel = require("../public/project/server/models/user.model.js")(mongoose,db);
    var movieModel = require("../public/project/server/models/movie.model.js")(mongoose,db);
    var eventModel = require("../public/project/server/models/event.model.js")(mongoose,db);

    require("../public/project/server/services/movie.service.server.js")(app, movieModel,userModel);
    require("../public/project/server/services/user.service.server.js")(app, userModel, movieModel,asgmtuserModel);
    require("../public/project/server/services/event.service.server.js")(app, eventModel,userModel);
    require("../public/project/server/services/movieapi.service.server.js")(app);

};