( function(){

    angular
          .module('CinephiliaApp')
          .controller('RegisterController',RegisterController);

        function RegisterController($scope,$location,$rootScope,UserService) {

            $scope.user = {};
            $scope.message = null;


            $scope.register = function(user,vpassword) {

                if (user.password !== vpassword) {
                    $scope.message = "Passwords must match";
                    return;
                }


                UserService.createUser(user)
                    .then(function(response){
                        if(typeof response == 'string'){
                            $scope.message = response;
                            return;
                        }else {
                            $rootScope.currentusr = response;
                            $location.path('/profile');
                        }
                    });
            }

        }

})();

