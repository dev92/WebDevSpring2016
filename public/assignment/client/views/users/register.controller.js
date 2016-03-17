(function()
{
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        $scope.message = null;
        $scope.vpassword = null;

        $scope.validate = function(user,vpassword){

            if(user == null || user.password == null || vpassword == null
                || user.password == ""|| vpassword == ""){
                //$scope.hide = false;
                return "form-group";
            }

            else if(user.password!==vpassword && vpassword!=null
                && vpassword!='' && user.password!=''){
                return "form-group has-error";
            }
            else if(user.password== vpassword &&
                vpassword!=null && user.password!=null
                && vpassword!='' && user.password!=''){
                return "form-group has-success";
            }
        }

        $scope.register = function(user) {

            if (user == null) {
                $scope.message = "Please fill in the required * fields";
                return;
            }
            if (user.username == null || !user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (user.password == null || $scope.vpassword == null) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password !== $scope.vpassword) {
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