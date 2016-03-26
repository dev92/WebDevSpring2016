module.exports = function() {

    // load movie schema from movie model

    var movies = require("./movies.mock.json");

    var api = {
        findMovieByImdbID: findMovieByImdbID,
        findMoviesByImdbIDs: findMoviesByImdbIDs,
        createMovie: createMovie,
        userLikesMovie: userLikesMovie,
        userDislikesMovie:userDislikesMovie
    };
    return api;

    function userLikesMovie (userId, imdbID) {

        // find the movie by imdb ID
        var movie = findMovieByImdbID(imdbID);
        movie.userFavorites.push(userId);
        return movie;
    }

    function findMoviesByImdbIDs (imdbIDs) {
        var matched = [];
            for(var m in imdbIDs){
                matched.push(findMovieByImdbID(imdbIDs[m]));
            }
        return matched;
    }

    function createMovie(movie) {

        // create instance of movie
        var movie = {
            imdbID: movie.imdbID,
            poster: movie.Poster,
            title: movie.Title,
            likes: []
        };
        movies.push(movie);
        return movies;
    }

    function findMovieByImdbID(imdbID) {
        for(var i in movies){
            if(movies[i].imdbID == imdbID){
                return movies[i];
            }
        }
        return null;
    }

    function userDislikesMovie(userId,imdbId){
        var movie = findMovieByImdbID(imdbId);
        for(var i in movie.userFavorites){
            if(movie.userFavorites[i] == userId){
                movie.userFavorites.splice(i,1)
                return movie;
            }
        }
    }
}