(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {

        $scope.message = null;

        $scope.login = function(user) {

            if (user == null) {
                $scope.message = "Please Enter Username and Password!";
                return;
            }
            if (user.username == null || !user.username) {
                $scope.message = "Please enter a username.";
                return;
            }
            if (user.password == null || !user.password) {
                $scope.message = "Please enter a password.";
                return;
            }

            UserService.login(user)
                .then(function(response){
                    if(response == null){
                        $scope.message = "Username/Password does not match!";
                        return;
                    }else{
                        console.log(response);
                        $rootScope.currentusr = response;
                        $location.path('/profile');
                    }

                });
        }
    }


})();