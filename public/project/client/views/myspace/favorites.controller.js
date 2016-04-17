(function(){
    angular
        .module("CinephiliaApp")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($scope,$rootScope,$location,MovieService) {

        $scope.movies = [];

        if($rootScope.currentusr){
            MovieService.findUserLikedMovies($rootScope.currentusr._id)
                .then(function(response){
                   $scope.movies = response;
                });
        }

        $scope.removeFavorite = function(tmdbId){
            MovieService.userDislikesMovie($rootScope.currentusr._id,tmdbId)
                .then(function(response){
                    return MovieService.findUserLikedMovies($rootScope.currentusr._id);
                })
                .then(function(movies){
                    $scope.movies = movies;
                });
        }

        $scope.setSimilarTitle = function(title){
            $rootScope.similarTitle = title;
        }

    }
})();