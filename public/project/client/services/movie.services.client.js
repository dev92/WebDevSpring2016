(function()
{
    angular
        .module("CinephiliaApp")
        .factory("MovieService", MovieService);

    function MovieService($http,$q) {

        var api = {
            //createMovie: createMovie,
            userLikesMovie: userLikesMovie,
            findUserLikes: findUserLikes,
            findUserLikedMovies:findUserLikedMovies,
            userDislikesMovie:userDislikesMovie,
            userReviewsMovie: userReviewsMovie,
            findMovieReviews: findMovieReviews,
            findUserReviews: findUserReviews,
            userDeletesReview:userDeletesReview
        };
        return api;


        //function createMovie(movie){
        //    var defer = $q.defer();
        //    var url = "/api/project/movie";
        //    $http.post(url,movie)
        //        .success(function(response){
        //            defer.resolve(response);
        //        });
        //    return defer.promise;
        //}

        function findUserLikes (tmdbID) {
            var defer = $q.defer();
            var url = "/api/project/movie/"+tmdbID+"/user";
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(err){
                });
            return defer.promise;
        }

        function userLikesMovie(userId, movie) {
            var defer = $q.defer();
            var url = "/api/project/user/"+userId+"/movie/"+movie.tmdbId;
            $http.post(url,movie)
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(err){
                    defer.reject(err);
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

        function userDislikesMovie(userId,tmdbId){
            var defer = $q.defer();
            var url = "/api/project/user/"+userId+"/movie/"+tmdbId;
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function userReviewsMovie(review){

            var defer = $q.defer();
            var url = "/api/project/user/"+review.userId+"/review/"+review.tmdbId;
            $http.post(url,review)
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(err){
                    defer.reject(err);
                });
            return defer.promise;
        }

        function findMovieReviews(tmdbId){
            var defer = $q.defer();
            var url = "/api/project/movie/"+tmdbId+"/review";
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(err){
                    defer.reject(err);
                });
            return defer.promise;
        }

        function userDeletesReview(userId,tmdbId){
            var defer = $q.defer();
            var url = "/api/project/user/"+userId+"/review/"+tmdbId;
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(err){
                    defer.reject(err);
                });
            return defer.promise;
        }

        function findUserReviews(userId){
            var defer = $q.defer();
            var url = "/api/project/user/"+userId+"/review";
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                })
                .error(function(err){
                    defer.reject(err);
                });
            return defer.promise;
        }
    }
})();