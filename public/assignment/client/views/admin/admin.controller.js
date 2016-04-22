(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope,UserService){

        $scope.reverse = false;
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
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        }

        function add(user){
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