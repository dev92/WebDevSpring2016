(function(){
    angular
        .module("CinephiliaApp")
        .controller("DetailController", DetailController);

    function DetailController($scope, $routeParams, MovieApiService) {
        $scope.imdbID = $routeParams.imdbID;

        MovieApiService.findMovieByImdbID(
            $scope.imdbID,
            function(response) {
                $scope.movie = response;
            }
        )
    }
})();