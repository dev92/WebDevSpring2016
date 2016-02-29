(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {

        $scope.dispalert = false;

        $scope.login = function(user) {

            UserService.findUserByCredentials(user.username,user.password,
                function(response){
                    if(response == null){
                        $scope.dispalert = true;
                    }else{
                        $rootScope.currentusr = response;
                        $location.path('/profile');
                    }

                });

        }
    }


})();