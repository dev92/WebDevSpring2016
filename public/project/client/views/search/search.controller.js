(function(){
    angular
        .module("CinephiliaApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, $routeParams, MovieApiService) {

        $scope.search = search;
        $scope.movietitle = $routeParams.movietitle;

        $scope.rate = 3;
        $scope.max = 5;


        if($scope.movietitle) {
            search($scope.movietitle);
        }

        function search(title) {
            $location.url("/search/"+$scope.movietitle);
            console.log(title);
            MovieApiService.findMovieByTitle(
                title,
                function(response){
                    console.log(response);
                    $scope.movies = response;
                });
        }
    }
})();