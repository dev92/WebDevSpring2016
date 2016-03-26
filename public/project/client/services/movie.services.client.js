(function()
{
    angular
        .module("CinephiliaApp")
        .factory("MovieService", MovieService);

    function MovieService($http,$q) {

        var api = {
            userLikesMovie: userLikesMovie,
            findUserLikes: findUserLikes,
            findUserLikedMovies:findUserLikedMovies,
            userDislikesMovie:userDislikesMovie
        };
        return api;

        function findUserLikes (imdbID) {
            var defer = $q.defer();
            var url = "/api/project/movie/"+imdbID+"/user";
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function userLikesMovie(userId, movie) {
            var defer = $q.defer();
            var url = "/api/project/user/"+userId+"/movie/"+movie.imdbID;
            $http.post(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserLikedMovies(userId,movieIds){
            var defer = $q.defer();
            var url = "/api/project/user/"+userId+"/movies";
            $http.get(url,movieIds)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function userDislikesMovie(userId,imdbId){
            var defer = $q.defer();
            var url = "/api/project/user/"+userId+"/movie/"+imdbId;
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }
    }
})();