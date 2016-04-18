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

                user.avatar ='http://all4ed.org/wp-content/themes/all4ed/assets/images/avatar-placeholder-generic.png';


                UserService.register(user)

                    .then(function(response) {

                            var user = response;

                            if(user != null) {
                                $rootScope.currentusr = user;
                                $location.url("/profile/"+user._id);

                            }else{
                                $scope.message = "Username already exists!";
                            }
                        },
                        function(err) {
                            $scope.message = err;
                        }
                    );

            }

        }

})();

