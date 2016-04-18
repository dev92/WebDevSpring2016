(function()
{
    angular
        .module("CinephiliaApp")
        .factory("MovieApiService", MovieApiService);

    function MovieApiService($http,$q) {



        var api = {
            findMovieByTitle : findMovieByTitle,
            findMovieByTmdbID:findMovieByTmdbID,
            findBasePath:findBasePath,
            findTrailers:findTrailers,
            findSimilarMovies:findSimilarMovies
            //findMovieReviews:findMovieReviews
        };

        return api;

        function findMovieByTitle(title) {
            var defer = $q.defer();
            var url = "/api/project/movie/"+title;
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(err){

                });
            return defer.promise;
        }

        function findMovieByTmdbID(tmdbID) {
            var defer = $q.defer();
            var url = "/api/project/movie/"+tmdbID+"/details";
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(err){

                });
            return defer.promise;
        }

        function findBasePath(){
            var defer = $q.defer();
            var url = "/api/project/api/config";
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(err){

                });
            return defer.promise;
        }

        function findTrailers(tmdbId){

            var defer = $q.defer();
            var url = "/api/project/movie/"+tmdbId+"/trailer";
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(err){

                });
            return defer.promise;
        }

        function findSimilarMovies(tmdbId){
            var defer = $q.defer();
            var url = "/api/project/movie/"+tmdbId+"/similar";
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(err){

                });
            return defer.promise;
        }

        //function findMovieReviews(tmdbId,callback){
        //    $http.get(movieReviewsUrl.replace("ID",tmdbId))
        //        .success(callback);
        //}

    }
})();