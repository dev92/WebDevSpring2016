"use strict";

var q = require("q");

module.exports = function(mongoose) {

    // load movie schema from movie model
    var MovieSchema = require('./movie.schema.server.js')(mongoose);
    var MovieModel  = mongoose.model("MovieModel", MovieSchema);

    //var movies = require("./movies.mock.json");

    return {
        findMovieByTmdbID: findMovieByTmdbID,
        findMoviesByTmdbIDs: findMoviesByTmdbIDs,
        createMovie: createMovie,
        userLikesMovie: userLikesMovie,
        userDislikesMovie: userDislikesMovie,
        userReviewsMovie: userReviewsMovie,
        deleteMovieReview: deleteMovieReview,
    };


    function userLikesMovie (tmdbID, userId) {

        var deferred = q.defer();

        // find the user
        MovieModel.findOne({"tmdbId":tmdbID}, function (err, doc) {

            // reject promise if error
            if (!doc) {
                deferred.reject(err);

            } else {
                // add movie id to user likes
                doc.userLikes.push (userId);

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

        //// find the movie by imdb ID
        //var movie = findMovieByImdbID(imdbID);
        //movie.userFavorites.push(userId);
        //return movie;
    }

    function findMoviesByTmdbIDs (tmdbIDs) {

        var deferred = q.defer();

        MovieModel.find({'tmdbId':{'$in':tmdbIDs}}, function(err, movies) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(movies);
            }
        });
        return deferred.promise;
        //var matched = [];
        //    for(var m in imdbIDs){
        //        matched.push(findMovieByImdbID(imdbIDs[m]));
        //    }
        //return matched;
    }

    function createMovie(movie) {

        var deferred = q.defer();

        MovieModel.create(movie, function(err, document) {
            if (err) {
                // reject promise if error
                deferred.reject(err)
            } else {
                // resolve promise
                deferred.resolve(document);
            }

        });
        return deferred.promise;

        // create instance of movie
        //var movie = {
        //    imdbID: movie.imdbID,
        //    poster: movie.Poster,
        //    title: movie.Title,
        //    likes: []
        //};
        //movies.push(movie);
        //return movies;
    }

    function findMovieByTmdbID(tmdbID) {

        var deferred = q.defer();

        MovieModel.findOne({'tmdbId':tmdbID}, function(err, movie) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(movie);
            }
        });
        return deferred.promise;
        //for(var i in movies){
        //    if(movies[i].imdbID == imdbID){
        //        return movies[i];
        //    }
        //}
        //return null;
    }

    function userDislikesMovie(movieId,userId) {

        var deferred = q.defer();

        MovieModel.findOne({'tmdbId':movieId}, function(err, movie) {
            if(err) {
                deferred.reject(err);
            } else {
                var users = movie.userLikes;
                var index = users.indexOf(userId);
                users.splice(index,1);
                movie.userLikes = users;

                movie.save(function(err, updatedMovie) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedMovie);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function userReviewsMovie(movieId,reviewedMovie){

        var deferred = q.defer();

        // find the user
        MovieModel.findOne({'tmdbId':movieId}, function(err, doc) {

            // reject promise if error
            if (err || !doc) {
                deferred.reject(err);
            } else {
                var reviewedUsers = doc.userReviews;
                var found = false;

                if(reviewedMovie.hasOwnProperty('tempReview')){
                    var newReview = reviewedMovie.tempReview;
                }else{
                    var newReview = reviewedMovie;
                }
                for(const m in reviewedUsers){
                    if(reviewedUsers[m].userId === newReview.userId){
                        reviewedUsers[m].review = newReview.review;
                        found = true;
                        break;
                    }
                }
                if(!found){
                    doc.userReviews.push(newReview);
                }else{
                    doc.userReviews = reviewedUsers;
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

    function deleteMovieReview(tmdbId,userId){

        var deferred = q.defer();

        // find the user
        MovieModel.findOne({'tmdbId':tmdbId}, function(err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                var reviewedUsers = doc.userReviews;
                for(const m in reviewedUsers){
                    if(reviewedUsers[m].userId === userId){
                        reviewedUsers.splice(m,1);
                        break;
                    }
                }
                doc.userReviews = reviewedUsers;
                // save movie
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with movie
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred.promise;

    }

}