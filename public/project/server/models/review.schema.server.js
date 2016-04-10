"use strict";

module.exports = function(mongoose) {

    var ReviewSchema = mongoose.Schema({
        "imdbId":String,
        "userId":String,
        "review":String
    }, {collection: "project.cinePhilia.review"});

    return ReviewSchema;
};