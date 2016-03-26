(function()
{
    angular
        .module("CinephiliaApp")
        .factory("MovieApiService", MovieApiService);

    function MovieApiService($http) {

        var config = "http://api.themoviedb.org/3/configuration?api_key=c8fee912d3f3866df68026f0ebadc6f6";

        var searchUrl = "http://api.themoviedb.org/3/search/movie?query=QUERY&api_key=c8fee912d3f3866df68026f0ebadc6f6";
        var genreMovies = "http://api.themoviedb.org/3/genre/GENRE/movies?api_key=c8fee912d3f3866df68026f0ebadc6f6";
        var detailsUrl = "http://api.themoviedb.org/3/movie/ID?api_key=c8fee912d3f3866df68026f0ebadc6f6";
        var imdbdetailsUrl = "https://api.themoviedb.org/3/find/IMDBID?external_source=imdb_id&api_key=c8fee912d3f3866df68026f0ebadc6f6";
        var trailerUrl = "http://api.themoviedb.org/3/movie/ID/videos?api_key=c8fee912d3f3866df68026f0ebadc6f6";



        var api = {
            findMovieByTitle : findMovieByTitle,
            findMovieByImdbID:findMovieByImdbID,
            findBasePath:findBasePath,
            findTrailers:findTrailers
        };

        return api;

        function findMovieByTitle(title,callback) {
            $http.get(searchUrl.replace("QUERY",title))
                .success(callback);
            //$http.get("http://www.omdbapi.com/?s="+title)
            //    .success(callback);
        }

        function findMovieByImdbID(imdbID, callback) {
            $http.get(detailsUrl.replace("ID",imdbID))
                .success(function (response){
                    $http.get("http://www.omdbapi.com/?i="+response.imdb_id)
                        .success(callback)
                });
        }

        function findBasePath(callback){
            $http.get(config)
                .success(callback);
        }

        function findTrailers(tmdbId,callback){
            $http.get(trailerUrl.replace("ID",tmdbId))
                .success(callback);
        }

    }
})();