(function(){
    angular
        .module("CinephiliaApp")
        .controller("DetailController", DetailController);

    function DetailController($scope, $rootScope, $routeParams, MovieApiService) {

        $scope.imdbID = $routeParams.imdbID;

        //$scope.imgpath = function (imgpath) {
        //
        //    //console.log($scope.basepath+"original"+imgpath)
        //    return $rootScope.basepath+"original"+imgpath;
        //
        //    //return "http://img.omdbapi.com/?i=ID&apikey=2bf5ee9".replace("ID",imdbID);
        //}

        $scope.addFavorite = function(movie){
            if($rootScope.currentusr){
                movie.favorite = !movie.favorite;
            }
        }

        MovieApiService.findMovieByImdbID(
            $scope.imdbID,
            function(response) {
                response.Poster = "http://img.omdbapi.com/?i=ID&apikey=2bf5ee9".replace("ID",response.imdbID)
                //console.log(response);
                $scope.movie = response;
            }
        )
    }
})();