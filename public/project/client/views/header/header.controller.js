( function(){

    angular
        .module('CinephiliaApp')
        .controller('HeaderController',HeaderController);

    function HeaderController($scope,$location,$rootScope,$routeParams,UserService) {

        $scope.movietitle = $routeParams.movietitle;

        $scope.Search = function (){
            $location.url("/search/"+$scope.movietitle);
        }

        $scope.linkTo = function(url) {
            $location.url(url);
        };

        $scope.reset = function() {
            UserService
                .logout()
                .then(
                    function(response){
                        $rootScope.currentusr = null;
                        $location.url("/home");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

    }

})();

