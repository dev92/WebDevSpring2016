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
        $scope.loading = true;


        //console.log($scope.user);

        if($rootScope.currentusr.moviesLiked.indexOf($scope.tmdbID) !=-1){
            $scope.favorite = true
        }

        var elementPos = $rootScope.currentusr.moviesRated.map(function(x) {return x.tmdbId; }).indexOf($scope.tmdbID);

        if(elementPos != -1){
            $scope.rating = $rootScope.currentusr.moviesRated[elementPos].rating;
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
                MovieService.userLikesMovie($rootScope.currentusr._id,newMovie)
                    .then(function (response) {
                        //console.log(response);
                        $scope.users = response;
                    });
            }else{
                MovieService.userDislikesMovie($rootScope.currentusr._id,movie.tmdbId)
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
                "userId":$rootScope.currentusr._id,
                "rating":rating
            };
            //console.log(ratingObj);
            MovieService.userRatesMovie($rootScope.currentusr._id,ratingObj)
                .then(function(ratings){
                    //console.log(ratings);
                    $scope.rating = rating;
                });
        };

        $scope.goToProfile = function(userId){
            $location.url("/profile/"+userId)
        };


        $scope.addReview = function(review,movie){
            var newReview = {
                "tmdbId":$scope.tmdbID,
                "userId":$rootScope.currentusr._id,
                "username":$rootScope.currentusr.username,
                "avatar":$rootScope.currentusr.avatar,
                "review":review,
                "poster":movie.poster,
                "movieTitle":movie.Title
            };

            var newMovie = {
                "title":movie.Title,
                "imdbId": movie.imdbID,
                "tmdbId": $scope.tmdbID,
                "poster": movie.poster,
                "trailer": movie.trailer,
                "tempReview":newReview
            };

            console.log(newMovie);

            MovieService.userReviewsMovie(newMovie,$rootScope.currentusr._id)
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

        MovieService.findMovieReviews($scope.tmdbID)
            .then(function(response){
                $scope.reviews = response;
            },function(err){
                $scope.reviews = [];
            });

    }
})();