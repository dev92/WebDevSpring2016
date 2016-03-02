(function()
{
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        $scope.message = null;

        $scope.validate = function(user){

            if(user == null || user.password == null || user.vpassword == null
                || user.password == ""|| user.vpassword == ""){
                //$scope.hide = false;
                return "form-group";
            }

            else if(user.password!==user.vpassword && user.vpassword!=null
                && user.vpassword!='' && user.password!=''){
                return "form-group has-error";
            }
            else if(user.password==user.vpassword &&
                user.vpassword!=null && user.password!=null
                && user.vpassword!='' && user.password!=''){
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
            if (user.password == null || user.vpassword == null) {
                $scope.message = "Please provide a password";
                return;
            }
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