"use strict";


module.exports = function(app, movieModel, userModel) {


    app.post("/api/project/user/:userId/movie/:tmdbID", userLikesMovie);
    app.delete("/api/project/user/:userId/movie/:tmdbID", userDislikesMovie);
    app.delete("/api/project/user/:userId/review/:tmdbID", deleteMovieReview);
    app.post("/api/project/user/:userId/review/:tmdbID", UserReviewsMovie);
    app.get("/api/project/movie/:tmdbID/user", findUserLikes);
    app.get("/api/project/user/:userId/movies", findUserFavorites);
    app.get("/api/project/movie/:tmdbID/review", findMovieReviews);
    app.get("/api/project/user/:userId/review", findUserReviews);

    //function findUserLikes (req, res) {



        //var imdbID = req.params.imdbID;
        //var movie = movieModel.findMovieByImdbID(imdbID);
        //if(movie){
        //    res.json(userModel.findUsersByIds(movie.userFavorites));
        //}else{
        //    res.status(404).send(null);
        //}


    //}

    function userLikesMovie(req,res){

        var userId = req.params.userId;
        var tmdbID = req.params.tmdbID;
        var movie = req.body;

        userModel
            .userLikesMovie(userId,tmdbID)
            // add user to movie likes
            .then(function (user) {
                    return movieModel.userLikesMovie(tmdbID, userId)
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(function (response) {
                    return userModel.FindUsersByIds(response.userLikes)
                },
                function (err) {
                    movie.userLikes = [userId];
                    return movieModel.createMovie(movie);
                    //res.status(400).send(err);
                }
            )
            .then(function(response){
                if(response.constructor == Array){
                    return response;
                }else{
                    return userModel.FindUsersByIds(response.userLikes)
                }
            },
                function(err){
                res.status(400).send(err);
            })
            .then(function(users){
                //console.log(users);
                res.json(users)

            },function(err){

                res.status(400).send(err);
            });
    }

    function findUserLikes(req, res){

        movieModel.findMovieByTmdbID(req.params.tmdbID)
            .then(
                function (response) {
                    return userModel.FindUsersByIds(response.userLikes)
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(function(users){

                res.json(users)

            },function(err){

                res.status(400).send(err);
            });
        //var user = userModel.FindById(req.params.userId);
        //res.json(movieModel.findMoviesByImdbIDs(user.favorites));
    }

    function findMovieReviews(req,res){
        movieModel.findMovieByTmdbID(req.params.tmdbID)
            .then(
                function (response) {

                    res.json(response.userReviews);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function findUserReviews(req,res){
        userModel.FindById(req.params.userId)
            .then(
                function (response) {

                    res.json(response.moviesReviewed);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userDislikesMovie(req, res){

        userModel.userDislikesMovie(req.params.userId,req.params.tmdbID)
            .then(function(user){
                return  movieModel.userDislikesMovie(req.params.tmdbID,req.params.userId)
        },function(err){
            res.status(400).send(err);
        })
            .then(
                function (response) {
                    return userModel.FindUsersByIds(response.userLikes)
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(function(users){
                res.json(users);
            },function(err){
                res.status(400).send(err);
            });
        //var user = userModel.userDislikesMovie(req.params.userId,req.params.imdbID)
        //res.json(movieModel.findMoviesByImdbIDs(user.favorites));
    }


    function deleteMovieReview(req,res){

        movieModel.deleteMovieReview(req.params.tmdbID,req.params.userId)
            .then(function(movie){
                return userModel.deleteUserReview(req.params.userId,req.params.tmdbID);

            },function(err){
                res.status(400).send(err);
            })
            .then(function(user){
                res.json(user.moviesReviewed);
            },function(err){
                res.status(400).send(err);
            });

    }

    function UserReviewsMovie(req,res){

        userModel.userReviewsMovie(req.params.userId,req.body)
            .then(function(user){
            return movieModel.userReviewsMovie(req.params.tmdbID,req.body)
            },function(err){
                res.status(400).send(err);
            })
            .then(function(movie){
                res.json(movie.userReviews);

            },function(err){
                var movie = req.body;
                movie.userReviews = [movie.tempReview];
                return movieModel.createMovie();
            })
            .then(function(movie){
                res.json(movie.userReviews);
            })
    }

    function findUserFavorites(req,res){
        userModel.FindById(req.params.userId)
            .then(function(user){
                return movieModel.findMoviesByTmdbIDs(user.moviesLiked)
            },function(err){
                res.status(400).send(err);
            })
            .then(function(movies){
                res.json(movies);
            },function(err){
                res.status(400).send(err);
            });

    }


}