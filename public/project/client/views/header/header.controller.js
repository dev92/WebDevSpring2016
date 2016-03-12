( function(){

    angular
        .module('CinephiliaApp')
        .controller('HeaderController',HeaderController);

    function HeaderController($scope,$location,$rootScope,$routeParams) {

        $scope.movietitle = $routeParams.movietitle;

        $scope.Search = function (){
            $location.url("/search/"+$scope.movietitle);
        }

        $scope.reset = function() {
            $rootScope.currentusr = null;
        }

    }

})();

