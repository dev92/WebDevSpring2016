(function(){
    angular
        .module("CinephiliaApp")
        .controller("HomeController", HomeController);

    function HomeController($scope,$location,$rootScope,MovieApiService) {


        $scope.currentPage = 1;
        $scope.itemsPerPage = 3;
        $scope.available = true;
        $scope.loading = true;

        $scope.sectionType = "search";

        function formImgPath(imgpath) {
            if (imgpath == null) {
                return 'http://www.movii.es/content/common/poster-not-available.jpg';
                //'/project/client/media/poster-not-found.jpg';
            } else {
                return $rootScope.basepath + "original" + imgpath;
            }

            //return "http://img.omdbapi.com/?i=ID&apikey=2bf5ee9".replace("ID",imdbID);
        }


        $scope.search = function (title) {
            //console.log(title);
            MovieApiService.findMovieByTitle(title)
                .then(function (response) {
                    for (result in response.results) {
                        response.results[result].poster_path = formImgPath(response.results[result].poster_path);
                    }
                    $scope.movies = response.results;
                    $scope.totalItems = $scope.movies.length;

                    if ($scope.totalItems > 3) {
                        $scope.available = false;
                    }
                });
        };

        $scope.details = function (tmdbId) {

            $scope.sectionType = "detail";

            MovieApiService.findMovieByTmdbID(tmdbId)
                .then(function (response) {
                    response.poster = "http://img.omdbapi.com/?i=ID&apikey=2bf5ee9".replace("ID", response.imdbID);
                    $scope.rating = Number(response.imdbRating).toFixed();
                    $scope.loading = false;
                    $scope.movie = response;
                });
        };

        $scope.linkTo = function(url) {
            $scope.movies = [];
            $scope.available = true;
            $scope.sectionType = "search";
            //$location.url(url);
        };
    }
})();