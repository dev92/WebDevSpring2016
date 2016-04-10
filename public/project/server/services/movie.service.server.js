"use strict"


module.exports = function(app, movieModel, userModel) {


    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);
    app.delete("/api/project/user/:userId/movie/:imdbID", userDislikesMovie);
    app.get("/api/project/movie/:imdbID/user", findUserLikes);
    app.get("/api/project/user/:userId/movies", findUserLikedMovies);

    function findUserLikes (req, res) {

        var imdbID = req.params.imdbID;
        var movie = movieModel.findMovieByImdbID(imdbID);
        if(movie){
            res.json(userModel.findUsersByIds(movie.userFavorites));
        }else{
            res.status(404).send(null);
        }


    }

    function userLikesMovie(req, res) {
        userModel.userLikesMovie(req.params.userId,req.params.imdbID);
        res.json(movieModel.userLikesMovie(req.params.userId,req.params.imdbID))
    }

    function findUserLikedMovies(req, res){
        var user = userModel.FindById(req.params.userId);
        res.json(movieModel.findMoviesByImdbIDs(user.favorites));
    }

    function userDislikesMovie(req, res){
        movieModel.userDislikesMovie(req.params.userId,req.params.imdbID);
        var user = userModel.userDislikesMovie(req.params.userId,req.params.imdbID)
        res.json(movieModel.findMoviesByImdbIDs(user.favorites));
    }


}