"use strict";

module.exports = function(mongoose) {
    var FieldSchema = require('./field.schema.server.js')(mongoose);
    var FormSchema = mongoose.Schema({
        "title": String,
        "userId": String,
        "fields": [FieldSchema],
        "created":Date,
        "updated":Date
    }, {collection: "assignment.formMaker.form"});

    return FormSchema;
};