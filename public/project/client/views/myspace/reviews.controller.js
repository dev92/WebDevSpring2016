(function(){
    angular
        .module("CinephiliaApp")
        .controller("ReviewsController", ReviewsController);

    function ReviewsController($scope, $rootScope, $location, MovieService) {

        $scope.reviews = [];
        $scope.buttonType = "edit";

        MovieService.findUserReviews($rootScope.currentusr._id)
            .then(function (response) {
                $scope.reviews = response;
            });


        $scope.editReview = function(review){
            $scope.buttonType = "submit";
        }

        $scope.submitReview = function(review){
            MovieService.userReviewsMovie(review,$rootScope.currentusr._id)
                .then(function(response){
                    $scope.reviews = response;
                    $scope.buttonType = "edit";
                });
        }

        $scope.removeReview = function(review){
            MovieService.userDeletesReview(review.userId,review.tmdbId)
                .then(function(response){
                    $scope.reviews = response;
                });
        }
    }
})();