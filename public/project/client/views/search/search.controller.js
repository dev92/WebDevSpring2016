(function(){
    angular
        .module("CinephiliaApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $rootScope, $location, $routeParams, MovieApiService) {

        $scope.search = search;
        $scope.movietitle = $routeParams.movietitle;

        function formImgPath (imgpath) {
            if(imgpath == null){
                return 'http://www.filmfodder.com/reviews/images/poster-not-available.jpg';
            }else{
                return $rootScope.basepath+"original"+imgpath;
            }

            //return "http://img.omdbapi.com/?i=ID&apikey=2bf5ee9".replace("ID",imdbID);
        }


        if($scope.movietitle) {
            search($scope.movietitle);
        }

        function search(title) {
            $location.url("/search/"+$scope.movietitle);
            //console.log(title);
            MovieApiService.findMovieByTitle(
                title,
                function(response){
                    //console.log(response.results);
                    for(result in response.results){
                        response.results[result].poster_path = formImgPath(response.results[result].poster_path);
                    }
                    $scope.movies = response.results;

                });
        }
    }
})();