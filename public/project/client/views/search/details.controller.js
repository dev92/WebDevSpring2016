(function(){
    angular
        .module("CinephiliaApp")
        .controller("DetailController", DetailController);

    function DetailController($scope, $rootScope, $routeParams, MovieApiService,MovieService) {

        $scope.imdbID = $routeParams.imdbID;
        $scope.users = [];
        $scope.movie = null;

        $scope.addFavorite = function(movie){
            if($rootScope.currentusr){
                movie.favorite = !movie.favorite;
            }
        }

        $scope.rateMovie = function(id,rating){
           //console.log(id+" "+rating);
        }

        MovieApiService.findMovieByImdbID(
            $scope.imdbID,
            function(response) {
                response.Poster = "http://img.omdbapi.com/?i=ID&apikey=2bf5ee9".replace("ID",response.imdbID)
                //console.log(response.imdbID);
                $scope.rating = Number(response.imdbRating).toFixed();
                $scope.movie = response;
                MovieService.findUserLikes($scope.movie.imdbID)
                    .then(function(response){
                        $scope.users = response;
                    });
            }
        )

    }
})();