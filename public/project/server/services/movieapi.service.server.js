"use strict";

var request = require('request');

module.exports = function(app) {

    app.get("/api/project/movie/:movieTitle", searchMovies);
    app.get("/api/project/api/config", getConfig);
    app.get("/api/project/movie/:tmdbId/details", getMovieDetails);
    app.get("/api/project/movie/:tmdbId/trailer", getMovieTrailer);
    app.get("/api/project/movie/:tmdbId/similar", getSimilarMovies);



    function searchMovies(req,res){

        var searchUrl = "http://api.themoviedb.org/3/search/movie?query=QUERY&api_key=c8fee912d3f3866df68026f0ebadc6f6";

        request
        .get(searchUrl.replace("QUERY",req.params.movieTitle),function(err,response,body){
            if (!err && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        });
    }


    function getConfig(req,res){

        var config = "http://api.themoviedb.org/3/configuration?api_key=c8fee912d3f3866df68026f0ebadc6f6";

        request
            .get(config,function(err,response,body){
                if (!err && response.statusCode == 200) {
                    res.json(JSON.parse(body));
                }
            });
    }

    function getMovieDetails (req,res){
        var detailsUrl = "http://api.themoviedb.org/3/movie/ID?api_key=c8fee912d3f3866df68026f0ebadc6f6";
        request
            .get(detailsUrl.replace("ID",req.params.tmdbId),function(err,response,body){
                if (!err && response.statusCode == 200) {
                    request
                        .get("http://www.omdbapi.com/?i="+JSON.parse(body).imdb_id,function(err,response,body){
                            if (!err && response.statusCode == 200) {
                                res.json(JSON.parse(body));
                            }
                        });
                }
            });
    }

    function getMovieTrailer(req,res){
        var trailerUrl = "http://api.themoviedb.org/3/movie/ID/videos?api_key=c8fee912d3f3866df68026f0ebadc6f6";
        request
            .get(trailerUrl.replace("ID",req.params.tmdbId),function(err,response,body){
                if (!err && response.statusCode == 200) {
                    res.json(JSON.parse(body));
                }
            });
    }

    function getSimilarMovies(req,res){
        var similarMoviesUrl = "http://api.themoviedb.org/3/movie/ID/similar?api_key=c8fee912d3f3866df68026f0ebadc6f6";
        request
            .get(similarMoviesUrl.replace("ID",req.params.tmdbId),function(err,response,body){
                if (!err && response.statusCode == 200) {
                    res.json(JSON.parse(body));
                }
            });
    }



}
