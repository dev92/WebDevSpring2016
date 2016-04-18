(function(){
    angular
        .module("CinephiliaApp")
        .controller("DetailController", DetailController);

    function DetailController($scope, $rootScope, $routeParams, $location, MovieApiService,MovieService,$sce) {

        $scope.tmdbID = $routeParams.tmdbID;
        $scope.users = [];
        $scope.reviews = [];
        $scope.movie = null;
        $scope.favorite = false;
        $scope.user = $rootScope.currentusr;
        $scope.loading = true;

        //console.log($scope.user);

        if($scope.user.moviesLiked.indexOf($scope.tmdbID) !=-1){
            $scope.favorite = true
        }

        var elementPos = $scope.user.moviesRated.map(function(x) {return x.tmdbId; }).indexOf($scope.tmdbID);

        if(elementPos != -1){
            $scope.rating = $scope.user.moviesRated[elementPos].rating;
        }



        $scope.toggleFavorite = function(movie){
            $scope.favorite = !$scope.favorite;

            if($scope.favorite){

                var newMovie = {
                    "title":movie.Title,
                    "imdbId": movie.imdbID,
                    "tmdbId": $scope.tmdbID,
                    "poster": movie.poster,
                    "trailer": movie.trailer
                };

                //console.log(movie);
                MovieService.userLikesMovie($scope.user._id,newMovie)
                    .then(function (response) {
                        //console.log(response);
                        $scope.users = response;
                    });
            }else{
                MovieService.userDislikesMovie($scope.user._id,movie.tmdbId)
                    .then(function (response) {
                        //console.log(response);
                        $scope.users = response;
                    });
            }


        };

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            //$scope.percent = 100 * (value / 5);
        };

        $scope.rateMovie = function(id,rating){
            var ratingObj = {
                "tmdbId":id,
                "userId":$scope.user._id,
                "rating":rating
            };
            //console.log(ratingObj);
            MovieService.userRatesMovie($scope.user._id,ratingObj)
                .then(function(ratings){
                    //console.log(ratings);
                    $scope.rating = rating;
                });
        };

        $scope.goToProfile = function(userId){
            $location.url("/profile/"+userId)
        }


        $scope.addReview = function(review){
            var newReview = {
                "tmdbId":$scope.tmdbID,
                "userId":$scope.user._id,
                "username":$scope.user.username,
                "avatar":$scope.user.avatar,
                "review":review,
                "poster":$scope.movie.poster,
                "movieTitle":$scope.movie.Title
            };

            MovieService.userReviewsMovie(newReview)
                .then(function(response){
                    $scope.reviews = response;
                    $scope.newreview = null;
                })
        };

        $scope.editReview = function(review){
            $scope.newreview = review;
        };

        $scope.removeReview = function(review){
            MovieService.userDeletesReview(review.userId,review.tmdbId)
                .then(function(response){
                    $scope.reviews = response;
                });
        };

        MovieApiService.findMovieByTmdbID($scope.tmdbID)
            .then(function(response){
                response.poster = "http://img.omdbapi.com/?i=ID&apikey=2bf5ee9".replace("ID",response.imdbID)
                //console.log(response.imdbID);
                //$scope.rating = Number(response.imdbRating).toFixed();

                $scope.loading = false;
                $scope.movie = response;

                $scope.movie.tmdbId = $scope.tmdbID;

            })
            .then(function(response){
                return MovieApiService.findTrailers($scope.tmdbID);
            })
            .then(function(response){
                for(var r in response.results) {
                    if (response.results[r].type == "Trailer") {
                        $scope.movie.trailer = "http://www.youtube.com/embed/" + response.results[r].key;
                        $scope.trailer = $sce.trustAsResourceUrl($scope.movie.trailer);
                        break;
                    }
                }
            });

        MovieService.findUserLikes($scope.tmdbID)
            .then(function(response){
                $scope.users = response;
            },function(err){
                $scope.users = [];
            });

    }
})();