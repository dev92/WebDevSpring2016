(function(){
    angular
        .module("CinephiliaApp")
        .controller("AdminController", AdminController)
        .config(function($mdThemingProvider) {
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('admin-dark', 'default')
                .backgroundPalette('grey')
                .primaryPalette('pink')
                .dark();
        });

    function AdminController($scope,UserService,MovieService,EventService){

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
            console.log(error);
            $scope.error = error;
        }


        function add(user){
            if(angular.equals({},user)){
                return;
            }else {

                user.avatar ='http://all4ed.org/wp-content/themes/all4ed/assets/images/avatar-placeholder-generic.png';

                UserService.createUser(user)
                    .then(function (response) {

                        $scope.users = response;
                        $scope.newuser = {};

                    }, function (err) {
                        $scope.error = err;
                    });
            }

        }

        function remove(user){

            if(user.moviesLiked.length > 0){
                for(var m in user.moviesLiked){
                    MovieService.userDislikesMovie(user._id,user.moviesLiked[m])
                        .then(function(response){
                        });
                }
            }

            if(user.moviesReviewed.length > 0){
                for(var m in user.moviesReviewed){
                    MovieService.userDeletesReview(user._id,user.moviesReviewed[m].tmdbId)
                        .then(function(response){
                            console.log(response);
                        });
                }
            }

            if(user.friends.length > 0){
                for(var m in user.friends){
                    UserService.deleteUserFriend(user._id,user.friends[m])
                        .then(function(response){
                        });
                }

            }

            EventService.findAllEventsForUser(user._id)
                .then(function(events){
                    for(var e in events){
                        if(events[e].hostId == userId._id){
                            EventService.deleteEvent(events[e]._id,user._id)
                                .then(function(response){
                                })
                        }else{
                            EventService.deleteEventForUser(user._id,events[e]._id)
                                .then(function(response){
                                })
                        }
                    }
                });


                UserService.deleteUserById(user._id)
                    .then(function(response){

                        for(var user in response){
                            delete response[user].password;
                        }
                        $scope.users = response;

                    }, function(err){
                        $scope.error = err;
                    });

        }

        function update(user){

            if(user.password == null || user.password ==''){
                delete user.password;
            }

            UserService.updateUser(user._id,user)
                .then(function(response){

                    for(var user in response){
                        delete response[user].password;
                    }

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