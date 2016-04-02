"use strict";

module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        "username": String,
        "password": String,
        "firstName": String,
        "lastName": String,
        "emails": [String],
        "phones":[String]
    }, {collection: "assignment.formMaker.user"});

    return UserSchema;
};