(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($location, $scope, $rootScope) {

        $scope.$location = $location;

    }
})();