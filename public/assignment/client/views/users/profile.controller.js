(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {

        $scope.hide = true;
        $scope.vpassword = null;
        $scope.regex = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;


        if($rootScope.currentusr!=null) {

            $scope.currentuser = $rootScope.currentusr;
        }

        $scope.validate = function(user,vpassword){

            if(user == null || user.password == null || vpassword == null
                || user.password == ""|| vpassword == ""){
                //$scope.hide = false;
                return "form-group";
            }

            else if(user.password!==vpassword && vpassword!=null
                && vpassword!='' && user.password!=''){
                $scope.hide = true;
                return "form-group has-error";
            }
            else if(user.password==vpassword &&
                vpassword!=null && user.password!=null
                && vpassword!='' && user.password!=''){
                $scope.hide = false;
                return "form-group has-success";
            }
        }

        $scope.update = function(user) {
            UserService.updateUser(user._id,user)
                .then(function(response){
                    if(response == 1){
                        $rootScope.currentusr = user;
                        $location.path('/profile');
                    }
                });
        }
    }


})();