(function()
{
    angular
        .module("CinephiliaApp")
        .factory("MovieService", MovieService);

    function MovieService($http,$q) {

        var api = {
            userLikesMovie: userLikesMovie,
            findUserLikes: findUserLikes
        };
        return api;

        function findUserLikes (imdbID) {
            var defer = $q.defer();
            console.log(imdbID);
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
    }
})();