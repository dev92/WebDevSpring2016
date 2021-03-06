"use strict";

module.exports = function(mongoose) {

    var reviewSchema = require('./review.schema.server.js')(mongoose);

    var MovieSchema = mongoose.Schema({
        "title":String,
        "imdbId":String,
        "tmdbId":String,
        "poster":String,
        "trailer":String,
        "userLikes":[String],
        "userReviews":[reviewSchema]
    }, {collection: "project.cinePhilia.movie"});

    return MovieSchema;
};