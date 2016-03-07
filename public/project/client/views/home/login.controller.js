( function(){

    angular
        .module('CinephiliaApp')
        .controller('LoginController',LoginController);

    function LoginController($scope,$location,$rootScope,UserService) {

        $scope.message = null;

        $scope.login = function(user) {

            console.log(user);

            //if (user == null) {
            //    $scope.message = "Please Enter Username and Password!";
            //    return;
            //}
            //if (user.username == null || !user.username) {
            //    $scope.message = "Please enter a username.";
            //    return;
            //}
            //if (user.password == null) {
            //    $scope.message = "Please enter a password.";
            //    return;
            //}

            UserService.findUserByCredentials(user.username,user.password,
                function(response){
                    if(response == null){
                        $scope.message = "Username/Password does not match!";
                    }else{
                        $rootScope.currentusr = response;
                        $location.path('/profile');
                    }

                });

        }
    }

})();

