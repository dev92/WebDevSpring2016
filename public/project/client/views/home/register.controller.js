( function(){

    angular
          .module('CinephiliaApp')
          .controller('RegisterController',RegisterController);

        function RegisterController($scope,$location,$rootScope,UserService) {

            $scope.user = {};
            $scope.message = null;


            $scope.register = function(user) {

                if (user.password !== user.vpassword) {
                    $scope.message = "Passwords must match";
                    return;
                }

                UserService.checkExistingUser(user,
                    function(response){
                        $scope.message = response;
                    });

                console.log($scope.message);

                if($scope.message == null){
                    UserService.createUser(user,
                        function(response){
                            $rootScope.currentusr = response;
                        });
                    $location.path('/profile');
                }
            }

        }

})();

