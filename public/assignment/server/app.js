"use strict";

module.exports = function(app,mongoose,db) {

    var userModel = require("./models/user.model.js")(mongoose,db);
    require("./services/user.service.server.js")(app, userModel);

    var formModel = require("./models/form.model.js")(mongoose,db);
    require("./services/form.service.server.js")(app, formModel);

    var fieldModel = require("./models/field.model.js")(mongoose,db);
    require("./services/field.service.server.js")(app, fieldModel);

};