(function()
{
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        $scope.hide = true;
        $scope.dispalert = false;

        $scope.validate = function(user){

            if(user == null || user.password == null || user.vpassword == null
                || user.password == ""|| user.vpassword == ""){
                //$scope.hide = false;
                return "form-group";
            }

            else if(user.password!==user.vpassword && user.vpassword!=null
                && user.vpassword!='' && user.password!=''){
                $scope.hide = true;
                return "form-group has-error";
            }
            else if(user.password==user.vpassword &&
                user.vpassword!=null && user.password!=null
                && user.vpassword!='' && user.password!=''){
                $scope.hide = false;
                return "form-group has-success";
            }
        }

        $scope.register = function(user) {
            UserService.checkExistingUser(user,
                function(response){
                    $scope.dispalert = response;
                });
            if(!$scope.dispalert){
                UserService.createUser(user,
                    function(response){
                        $rootScope.currentusr = response;
                        console.log($rootScope.currentusr);
                    });
                $location.path('/profile');
            }
        }

    }

})();