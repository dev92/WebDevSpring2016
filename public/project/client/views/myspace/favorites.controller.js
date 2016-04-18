(function(){
    angular
        .module("CinephiliaApp")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($scope,$routeParams,$rootScope,$location,MovieService) {

        $scope.movies = [];

        var profileId = $routeParams.userId;
        $scope.otherUser = profileId;

        //if($rootScope.currentusr._id != profileId) {
        //    $scope.otherUser = "true";
        //}

        MovieService.findUserLikedMovies(profileId)
            .then(function(response){
                $scope.movies = response;
            });

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