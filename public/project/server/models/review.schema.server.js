"use strict";

module.exports = function(mongoose) {

    var ReviewSchema = mongoose.Schema({
        "tmdbId":String,
        "userId":String,
        "username":String,
        "avatar":String,
        "movieTitle":String,
        "poster":String,
        "review":String
    }, {collection: "project.cinePhilia.review"});

    return ReviewSchema;
};