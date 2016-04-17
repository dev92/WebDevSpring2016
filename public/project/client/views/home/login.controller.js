( function(){

    angular
        .module('CinephiliaApp')
        .controller('LoginController',LoginController);

    function LoginController($scope,$location,$rootScope,UserService) {

        $scope.message = null;

        $scope.login = function(user) {

            UserService.login(user)
                .then(function(response){

                        var user = response;

                        if(user != null) {
                            $rootScope.currentusr = user;
                            $location.url("/profile/"+user._id);
                        }
                    },
                    function(err) {
                        $scope.message = err;
                    });
        }
    }

})();

