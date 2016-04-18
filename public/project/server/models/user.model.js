"use strict";

var q = require("q");

module.exports = function(mongoose,db) {

    //var users = require("./users.mock.json");
    var UserSchema = require('./user.schema.server.js')(mongoose);
    var UserModel  = db.model("UserModel", UserSchema);


    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        FindUserByUsername: FindUserByUsername,
        FindUserByCredentials: FindUserByCredentials,
        FindUsersByIds: FindUsersByIds,
        userAddsFriend: userAddsFriend,
        userGetsFriendRequest: userGetsFriendRequest,
        userDeletsRequest: userDeletsRequest,
        userLikesMovie: userLikesMovie,
        userRatesMovie: userRatesMovie,
        userReviewsMovie: userReviewsMovie,
        deleteUserReview: deleteUserReview,
        userDislikesMovie:userDislikesMovie,
        deleteUserFriend:deleteUserFriend,
    };
    return api;

    function Create(user){

        var deferred = q.defer();

        UserModel.create(user, function(err, document) {
            if (err) {
                // reject promise if error
                deferred.reject(err)
            } else {
                // resolve promise
                deferred.resolve(document);
            }

        });
        return deferred.promise;
        //var msg = checkExistingUser(user);
        //if(msg == null){
        //    user._id = uuid.v1();
        //    users.push(user);
        //    return user;
        //}
        //return msg;

    }

    function FindAll(){

        var deferred = q.defer();

        UserModel.find(function(err, users) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
        //return users;
    }

    function FindById(id){

        var deferred = q.defer();

        UserModel.findById(id, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
        //for(var u in users){
        //    if(users[u]._id == id ){
        //        return users[u];
        //    }
        //}
        //return null;
    }

    function Update(id,user){

        var deferred = q.defer();

        UserModel.findById(id,function(err,response){
            if(err){
                deferred.reject(err);
            }else{
                response.firstName = user.firstName;
                response.lastName = user.lastName;
                response.username = user.username;
                response.password = user.password;
                response.email = user.email;
                response.phone = user.phone;
                response.role = user.role;
                response.address = user.address;
                response.gender = user.gender;
                response.city = user.city;
                response.state = user.state;
                response.zip = user.zip;
                response.genres = user.genres;
                response.friends = user.friends;
                response.requests = user.requests;
                response.moviesLiked = user.moviesLiked;
                response.moviesRated = user.moviesRated;
                response.moviesReviewed = user.moviesReviewed;
                response.avatar = user.avatar;

                response.save(function(err, document) {
                    deferred.resolve(document);
                });
            }
        });
        return deferred.promise;

        //for(var u in users){
        //    if(users[u]._id == id ){
        //        users[u] = user;
        //    }
        //}
        //return user;
    }

    function Delete(id){

        var deferred = q.defer();
        UserModel.remove({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
        //for(var u in users){
        //    if(users[u]._id == id ){
        //        users.splice(u,1);
        //    }
        //}
        //return users;
    }

    function FindUserByUsername(username){

        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
        //for(var u in users){
        //    if(users[u].username == username){
        //        return users[u];
        //    }
        //}
        //return null;
    }

    function FindUserByCredentials(credentials){
        var deferred = q.defer();
        UserModel.findOne({username: credentials.username, password: credentials.password}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
        //for(var u in users){
        //    if(users[u].username == credentials.username && users[u].password == credentials.password ){
        //        return users[u];
        //    }
        //}
        //return null;
    }


    function FindUsersByIds(userIds){

        var deferred = q.defer();

        UserModel.find({'_id':{'$in':userIds}}, function(err, users) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;

        //var friends = [];
        //for(var i in users){
        //    if(users[i]._id == userId){
        //        for(var u in users[i].friends){
        //            friends.push(FindById(users[i].friends[u]))
        //        }
        //        break;
        //    }
        //}
        //
        //return friends;
    }

    function deleteUserFriend(userId,friendId) {

        var deferred = q.defer();

        UserModel.findById(userId, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {

                var friends = user.friends;
                var index = friends.indexOf(friendId);
                friends.splice(index,1);
                user.friends = friends;

                user.save(function(err, updatedUser) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedUser);
                    }
                });
            }
        });
        return deferred.promise;

        //var friends = [];
        //console.log(friendId);
        //for (var i in users) {
        //    if (users[i]._id == userId) {
        //        for (var u in users[i].friends) {
        //            if (users[i].friends[u] == friendId) {
        //                users[i].friends.splice(u, 1);
        //                return findFriendsById(Update(userId, users[i])._id)
        //            }
        //        }
        //    }
        //}
    }



    function userLikesMovie(userId,movieId){

        var deferred = q.defer();

        // find the user

        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.moviesLiked.push (movieId);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred.promise;

        //var user = FindById(userId);
        //if(user){
        //    user.favorites.push(movie.imdbID);
        //    return Update(userId,user);
        //}
    }

    function userDislikesMovie(userId,movieId) {

        var deferred = q.defer();

        UserModel.findById(userId, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                var movies = user.moviesLiked;
                var index = movies.indexOf(movieId);
                movies.splice(index,1);
                user.moviesLiked = movies;
                user.save(function(err, updatedUser) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedUser);
                    }
                });
            }
        });
        return deferred.promise;
    }
    //    var user = FindById(userId);
    //    if(user){
    //        for(var m in user.favorites){
    //            if(user.favorites[m] == imdbId){
    //                user.favorites.splice(m,1);
    //                return Update(userId,user);
    //            }
    //        }
    //
    //    }
    //}

    function userAddsFriend(userId,friendId){

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.friends.push (friendId);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred.promise;


    }

    function userGetsFriendRequest(userId,friendId){

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.requests.push (friendId);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred.promise;

    }

    function userDeletsRequest(userId,friendId){

        var deferred = q.defer();

        UserModel.findById(userId, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {

                var requests = user.requests;
                var index = requests.indexOf(friendId);
                requests.splice(index,1);
                user.requests = requests;
                user.save(function(err, updatedUser) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedUser);
                    }
                });
            }
        });
        return deferred.promise;

    }

    function userRatesMovie(userId,ratedMovie){
        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                var ratedMovies = doc.moviesRated;
                var found = false;
                for(var m in ratedMovies){
                    if(ratedMovies[m].tmdbId == ratedMovie.tmdbId){
                        ratedMovies[m].rating = ratedMovie.rating;
                        found = true;
                        break;
                    }
                }
                if(!found){
                    doc.moviesRated.push(ratedMovie);
                }else{
                    doc.moviesRated = ratedMovies;
                }
                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function userReviewsMovie(userId,reviewedMovie){

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                var reviewedMovies = doc.moviesReviewed;
                var found = false;
                for(var m in reviewedMovies){
                    if(reviewedMovies[m].imdbId == reviewedMovie.imdbId){
                        reviewedMovies[m].review = reviewedMovie.review;
                        found = true;
                        break;
                    }
                }
                if(!found){
                    doc.moviesReviewed.push(reviewedMovie);
                }else{
                    doc.moviesReviewed = reviewedMovies;
                }
                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteUserReview(userId,tmdbId){

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                var reviewedMovies = doc.moviesReviewed;
                for(var m in reviewedMovies){
                    if(reviewedMovies[m].tmdbId == tmdbId){
                        reviewedMovies.splice(m,1);
                        break;
                    }
                }

                doc.moviesReviewed = reviewedMovies;
                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred.promise;

    }

}