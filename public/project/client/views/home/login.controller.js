( function(){

    angular
        .module('CinephiliaApp')
        .controller('LoginController',LoginController);

    function LoginController($scope,$location,$rootScope,UserService) {

        $scope.message = null;

        $scope.login = function(user) {

            UserService.findUserByCredentials(user.username,user.password)
                .then(function(response){
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

