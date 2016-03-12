(function(){
    angular
        .module("CinephiliaApp")
        .controller("DetailController", DetailController);

    function DetailController($scope, $routeParams, MovieApiService) {
        $scope.imdbID = $routeParams.imdbID;

        $scope.imgpath = function (imdbID) {
            return "http://img.omdbapi.com/?i=ID&apikey=2bf5ee9".replace("ID",imdbID);
        }

        MovieApiService.findMovieByImdbID(
            $scope.imdbID,
            function(response) {
                $scope.movie = response;
            }
        )
    }
})();