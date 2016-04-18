(function () {
    'use strict';
    angular
        .module('CinephiliaApp')
        .controller('NewEventController', NewEventController);


    function NewEventController ($mdConstant,$scope, $rootScope, $location, EventService,UserService, $mdToast) {
        // Use common key codes found in $mdConstant.KEY_CODE...
        $scope.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
        var lastSearch;

        $scope.friends = [];

        UserService.findUserFriends($rootScope.currentusr._id)
            .then(function(friends){
                $scope.friends = friends;
            });

        $scope.event = {};

        $scope.event.hostId = $rootScope.currentusr._id;
        $scope.event.host = $rootScope.currentusr.firstName;
        $scope.event.invitees = [];

        $scope.myDate = new Date();
        $scope.minDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth(),
            $scope.myDate.getDate());

        $scope.states = ('SELECT AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
            return {abbrev: state};
        });

        $scope.querySearch = function(query){
            //console.log(query);
            lastSearch = lastSearch || query;
            return lastSearch ? $scope.friends.filter(createFilterFor(query)) : [];
        }


        function createFilterFor(query) {
            //var lowercaseQuery = angular.lowercase(query);
            return function filterFn(contact) {
                return (contact.username.indexOf(query) != -1);;
            };
        }

        $scope.createEvent = function(newEvent){

            if(newEvent.invitees.length > 0){

                for(var i in newEvent.invitees){
                    newEvent.invitees[i] = newEvent.invitees[i]._id;
                }
                newEvent.invitees.push($rootScope.currentusr._id);
                EventService.createEvent(newEvent)
                    .then(function(response){
                        $scope.event = {};
                        $location.url("/currentEvents")
                    });
            }else{
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Please Enter valid Invitees!')
                        .position('top')
                        .theme('error-toast')
                        .hideDelay(3000)
                );
            }

        }


    }
})();