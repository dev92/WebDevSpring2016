(function(){
    angular
        .module("CinephiliaApp")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($scope,$routeParams,$rootScope,$location,MovieService) {

        $scope.movies = [];

        $scope.currentPage = 1;
        $scope.itemsPerPage = 3;
        $scope.available = true;

        var profileId = $routeParams.userId;
        $scope.otherUser = profileId;

        //if($rootScope.currentusr._id != profileId) {
        //    $scope.otherUser = "true";
        //}

        MovieService.findUserLikedMovies(profileId)
            .then(function(response){
                $scope.movies = response;

                $scope.totalItems = $scope.movies.length;

                if($scope.totalItems > 3){
                    $scope.available = false;
                }
            });

        $scope.removeFavorite = function(tmdbId){
            MovieService.userDislikesMovie($rootScope.currentusr._id,tmdbId)
                .then(function(response){
                    return MovieService.findUserLikedMovies($rootScope.currentusr._id);
                })
                .then(function(movies){
                    $scope.movies = movies;

                    $scope.totalItems = $scope.movies.length;

                    if($scope.totalItems > 3){
                        $scope.available = false;
                    }
                });
        }

        $scope.setSimilarTitle = function(title){
            $rootScope.similarTitle = title;
        }

    }
})();