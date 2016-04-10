"use strict";

module.exports = function(mongoose) {

    var ratingSchema = require('./rating.schema.server.js')(mongoose);
    var reviewSchema = require('./review.schema.server.js')(mongoose);

    var UserSchema = mongoose.Schema({
        "username": String,
        "password": String,
        "firstName": String,
        "lastName": String,
        "address": String,
        "gender":String,
        "city":String,
        "state":String,
        "zip":Number,
        "email": String,
        "phone":String,
        "role":String,
        "friends":[String],
        "moviesLiked":[String],
        "moviesRated":[ratingSchema],
        "moviesReviewed":[reviewSchema]
        //"eventsInvited":[String]
    }, {collection: "project.cinePhilia.user"});

    return UserSchema;
};