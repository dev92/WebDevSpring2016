(function(){
    angular
        .module("CinephiliaApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, $routeParams, MovieApiService) {

        $scope.search = search;
        $scope.movietitle = $routeParams.movietitle;
        //$scope.basepath = null;

        //$scope.init = function(){
        //    MovieApiService.findBasePath(function(response){
        //       $scope.basepath =  response.images.base_url
        //    });
        //}

        $scope.imgpath = function (imdbID) {
            return "http://img.omdbapi.com/?i=ID&apikey=2bf5ee9".replace("ID",imdbID);
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
                    //console.log(response);
                    $scope.movies = response.Search;
                });
        }
    }
})();