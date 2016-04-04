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

                        var user = response;

                        if(user != null) {
                            $rootScope.currentusr = user;
                            $location.url("/profile");
                        }
                    },
                    function(err) {
                        $scope.message = err;
                    });
        }
    }


})();