"use strict";

module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        "label": String,
        "type" : String, enum: ["TEXT", "TEXTAREA", "DATE","OPTIONS", "CHECKBOXES", "RADIOS"],
        "options": [{label: String, value: String}],
        "placeholder": String
    });

    return FieldSchema;
};