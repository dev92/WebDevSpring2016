( function(){

    angular
        .module('CinephiliaApp')
        .controller('HeaderController',HeaderController);

    function HeaderController($scope,$location,$rootScope) {

        $scope.reset = function() {
            $rootScope.currentusr = null;
        }

    }

})();

