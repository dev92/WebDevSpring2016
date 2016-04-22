(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {

        $scope.vpassword = null;
        $scope.emregex = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;
        $scope.phregex = /^\s?\d{10}(,\s?\d{10})*$/;
        $scope.message = null;


        if($rootScope.currentusr!=null) {

            $scope.currentuser = $rootScope.currentusr;
            delete $scope.currentuser.password;
        }

        //$scope.validate = function(user,vpassword){
        //
        //    if(user == null || user.password == null || vpassword == null
        //        || user.password == ""|| vpassword == ""){
        //        //$scope.hide = false;
        //        return "form-group";
        //    }
        //
        //    else if(user.password!= vpassword && vpassword!=null
        //        && vpassword!='' && user.password!=''){
        //        $scope.hide = true;
        //        return "form-group has-error";
        //    }
        //    else if(user.password==vpassword &&
        //        vpassword!=null && user.password!=null
        //        && vpassword!='' && user.password!=''){
        //        $scope.hide = false;
        //        return "form-group has-success";
        //    }
        //}

        $scope.update = function(user,vpassword) {

            if (user.password != vpassword && user.password!='' && vpassword!=null) {
                $scope.message = "Passwords must match";
                return;
            }else if(user.password!='' && vpassword==null && user.password){
                $scope.message = "Enter verify password!";
                return
            }

            if(user.password == ""){
                delete user.password;
            }


            UserService.updateUser(user._id,user)
                .then(function(response){
                        $rootScope.currentusr = response;
                        delete $scope.currentuser.password;
                        $scope.vpassword = null;
                        $scope.hide = true;
                        $location.path('/profile');
                });
        }
    }


})();