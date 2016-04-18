(function(){
    angular
        .module("CinephiliaApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $rootScope, $location, $routeParams, MovieApiService) {

        $scope.search = search;
        $scope.searchType = "movie";
        $scope.movietitle = $routeParams.movietitle;



        $scope.currentPage = 1;
        $scope.itemsPerPage = 3;
        $scope.available = true;

        function formImgPath (imgpath) {
            if(imgpath == null){
                return '../project/client/media/poster-not-found.jpg';
            }else{
                return $rootScope.basepath+"original"+imgpath;
            }

            //return "http://img.omdbapi.com/?i=ID&apikey=2bf5ee9".replace("ID",imdbID);
        }


        if(isNaN($scope.movietitle) && $scope.movietitle) {
            search($scope.movietitle);
        }else if($scope.movietitle){
            $scope.searchType = "similar";
            similar($scope.movietitle);
        }



        function search(title) {
            $location.url("/search/"+title);
            //console.log(title);
            MovieApiService.findMovieByTitle(
                title,
                function(response){
                    //console.log(response.results);
                    for(result in response.results){
                        response.results[result].poster_path = formImgPath(response.results[result].poster_path);
                    }
                    $scope.movies = response.results;
                    $scope.totalItems = $scope.movies.length;

                    if($scope.totalItems > 3){
                        $scope.available = false;
                    }


                });
        }

        function similar(tmdbId){
            MovieApiService.findSimilarMovies(
                tmdbId,
                function(response){
                    //console.log(response.results);
                    for(result in response.results){
                        response.results[result].poster_path = formImgPath(response.results[result].poster_path);
                    }
                    $scope.movies = response.results;
                    $scope.totalItems = $scope.movies.length;

                    if($scope.totalItems > 3){
                        $scope.available = false;
                    }


                });
        }
    }
})();