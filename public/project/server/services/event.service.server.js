"use strict"


module.exports = function(app, eventModel, userModel) {


    app.post("/api/project/event", userCreatesEvent);
    app.delete("/api/project/host/:hostId/event/:eventId", deleteEvent);
    app.delete("/api/project/user/:userId/event/:eventId", userCannotAttend);
    app.put("/api/project/event/:eventId", updateEvent);
    app.get("/api/project/user/:userId/event", findUserEvents);
    //app.get("/api/project/user/:userId/movies", findUserFavorites);
    //app.get("/api/project/movie/:tmdbID/review", findMovieReviews);
    //app.get("/api/project/user/:userId/review", findUserReviews);

    //function findUserLikes (req, res) {



    //var imdbID = req.params.imdbID;
    //var movie = movieModel.findMovieByImdbID(imdbID);
    //if(movie){
    //    res.json(userModel.findUsersByIds(movie.userFavorites));
    //}else{
    //    res.status(404).send(null);
    //}


    //}

    function userCreatesEvent(req,res){

        var event = req.body;

        eventModel
            .CreateEvent(event)
            .then(function(newevent){
                //console.log(users);
                res.json(newevent);
            },function(err){

                res.status(400).send(err);
            });
    }

    function deleteEvent(req, res){

        var eventId = req.params.eventId;
        var hostId = req.params.hostId;

        eventModel.DeleteEvent(eventId)
            .then(
                function (response) {
                    return eventModel.FindEventsByUserId(hostId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(function(events){

                res.json(events)

            },function(err){

                res.status(400).send(err);
            });
    }

    function userCannotAttend(req,res){

        var eventId = req.params.eventId;
        var userId = req.params.userId;

        eventModel.RemoveUser(eventId,userId)
            .then(
                function (response) {
                    return eventModel.FindEventsByUserId(userId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(function(events){

                res.json(events)

            },function(err){

                res.status(400).send(err);
            });
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
                res.status(400).send(err);
            });
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