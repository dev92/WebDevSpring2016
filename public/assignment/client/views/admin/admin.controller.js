(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope,UserService){

        $scope.reverse = false;
        $scope.usrname_reverse = false;
        $scope.predicate = 'username';
        $scope.selectedFormIndex = null;
        $scope.disable = true;
        $scope.newuser = {};


        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.selectUser = selectUser;

        $scope.init = function() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }


        function handleSuccess(response) {

            for(var user in response){
                delete response[user].password;
            }
            $scope.users = response;
        }

        function handleError(error) {
            $scope.error = error;
        }

        $scope.sort = function(predicate) {

            if(predicate === "username"){
                $scope.usrname_reverse = !$scope.usrname_reverse;
                $scope.reverse = $scope.usrname_reverse
            }else if(predicate === "firstName"){
                $scope.first_reverse = !$scope.first_reverse;
                $scope.reverse = $scope.first_reverse

            }else if(predicate === "lastName"){
                $scope.last_reverse = !$scope.last_reverse;
                $scope.reverse = $scope.last_reverse

            }
            //$scope.usrname_reverse = (predicate === "username") ? !$scope.usrname_reverse : false;
            //$scope.first_reverse = (predicate === "firstName") ? !$scope.first_reverse : false;
            //$scope.last_reverse = (predicate === "lastName") ? !$scope.last_reverse : false;
            //$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        }

        function add(user){
            console.log(user);
            UserService.createUser(user)
                .then(function(response){

                    for(var user in response){
                        delete response[user].password;
                    }

                    $scope.users = response;
                    $scope.newuser = {};

                }, function(err){
                    $scope.error = err;
                });

        }

        function remove(userId){
            UserService.deleteUserById(userId)
                .then(function(response){

                    $scope.users = response;

                }, function(err){
                    $scope.error = err;
                });

        }

        function update(user){

            if(user.password == null || user.password ==''){
                delete user.password;
            }

            UserService.updateUserByAdmin(user._id,user)
                .then(function(response){

                    $scope.users = response;
                    $scope.newuser = {};
                    $scope.selectedUserIndex = null;
                    $scope.disable = true;

                }, function(err){
                    $scope.error = err;
                });

        }

        function selectUser(user,index){
            $scope.selectedUserIndex = index;
            $scope.newuser = user;
            $scope.disable = false;
        }


    }
})();