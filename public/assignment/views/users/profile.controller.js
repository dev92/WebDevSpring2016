(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {

        $scope.hide = true;


        if($rootScope.currentusr!=null) {

            $scope.currentuser = $rootScope.currentusr;
        }

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

        $scope.update = function(user) {
            UserService.updateUser(user._id,user,
                function(response){
                    $rootScope.currentusr = response;
                });
            $location.path('/profile');
        }
    }


})();