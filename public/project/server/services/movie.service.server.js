"use strict"


module.exports = function(app, movieModel, userModel) {


    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);
    app.get("/api/project/movie/:imdbID/user", findUserLikes);

    function findUserLikes (req, res) {

        var imdbID = req.params.imdbID;
        var movie = movieModel.findMovieByImdbID(imdbID);
        res.json(userModel.findUsersByIds(movie.userFavorites));

    }

    function userLikesMovie(req, res) {
        userModel.userLikesMovie(req.params.userId,req.params.imdbID)
        res.json(movieModel.userLikesMovie(req.params.userId,req.params.imdbID))
    }
}