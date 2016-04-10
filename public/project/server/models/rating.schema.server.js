"use strict";

module.exports = function(mongoose) {

    var RatingSchema = mongoose.Schema({
        "imdbId":String,
        "userId":String,
        "rating":Number
    }, {collection: "project.cinePhilia.rating"});

    return RatingSchema;
};