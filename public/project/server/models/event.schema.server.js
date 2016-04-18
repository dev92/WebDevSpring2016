"use strict";

module.exports = function(mongoose) {


    var EventSchema = mongoose.Schema({
        "hostId": String,
        "host":String,
        "movieName": String,
        "address": String,
        "city":String,
        "state":String,
        "zip":String,
        "email": String,
        "phone":String,
        "date":Date,
        "invitees":[String]
    }, {collection: "project.cinePhilia.event"});

    return EventSchema;
};