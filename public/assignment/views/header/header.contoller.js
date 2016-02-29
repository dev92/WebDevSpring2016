(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope) {
        $scope.reset = function() {
            $rootScope.currentusr = null;
        }
    }
})();