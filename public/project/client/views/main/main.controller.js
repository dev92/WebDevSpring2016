( function(){

    angular
        .module('CinephiliaApp')
        .controller('MainController',MainController);

    function MainController($scope,$location,$rootScope) {
        $scope.$location = $location;

    }

})();

