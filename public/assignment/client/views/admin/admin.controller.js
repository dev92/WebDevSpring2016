(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope,$location,UserService){

        $scope.reverse = false;
        $scope.predicate = 'username';

        $scope.init = function() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }


        function handleSuccess(response) {
            $scope.users = response;
        }

        function handleError(error) {
            console.log(error);
            $scope.error = error;
        }

        $scope.sort = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };


    }
})();