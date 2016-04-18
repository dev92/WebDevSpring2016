"use strict";

module.exports = function(mongoose) {

    var RatingSchema = mongoose.Schema({
        "tmdbId":String,
        "userId":String,
        "rating":Number
    });

    return RatingSchema;
};