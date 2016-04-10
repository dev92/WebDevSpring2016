"use strict";

module.exports = function(mongoose) {

    var reviewSchema = require('./review.schema.server.js')(mongoose);

    var MovieSchema = mongoose.Schema({
        "imdbId":String,
        "tmdbId":String,
        "poster":String,
        "trailer":String,
        "imdbRating":Number,
        "vote_average":Number,
        "userLikes":[String],
        "userReviews":[reviewSchema]
    }, {collection: "project.cinePhilia.movie"});

    return MovieSchema;
};