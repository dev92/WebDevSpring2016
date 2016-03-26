(function(){
    angular
        .module("CinephiliaApp")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($scope,$rootScope,MovieService) {

        $scope.movies = [];

        if($rootScope.currentusr){
            MovieService.findUserLikedMovies($rootScope.currentusr._id)
                .then(function(response){
                   $scope.movies = response;
                });
        }

        $scope.removeFavorite = function(imdbId){
            MovieService.userDislikesMovie($rootScope.currentusr._id,imdbId)
                .then(function(response){
                    $scope.movies = response;
                })
        }

    }
})();