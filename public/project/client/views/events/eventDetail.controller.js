(function () {
    'use strict';
    angular
        .module('CinephiliaApp')
        .controller('EventDetailController', EventDetailController);


    function EventDetailController ($mdToast,$scope,$rootScope,EventService,$routeParams, UserService) {

        $scope.eventId = $routeParams.eventId;
        $scope.event = {};
        var lastSearch;


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


        $scope.friends = [];

        UserService.findUserFriends($rootScope.currentusr._id)
            .then(function(friends){
                $scope.friends = friends;
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

        EventService.findEventById($scope.eventId)
            .then(function(response){
                $scope.event = response;
                $scope.event.date = new Date(response.date);
                return EventService.findInviteesByIds($scope.event._id);
            })
            .then(function (invitees) {
                var index = invitees.map(function(x) {return x._id; }).indexOf($scope.event.hostId);
                invitees.splice(index,1);
                $scope.event.invitees = invitees;
            });


        $scope.updateEvent = function(newevent) {

            if (newevent.invitees.length > 0) {

                for (var i in newevent.invitees) {
                    newevent.invitees[i] = newevent.invitees[i]._id;
                }

                $scope.event.invitees.push($rootScope.currentusr._id);

                EventService.updateEvent(newevent._id, newevent)
                    .then(function(response){
                        $scope.event = response;
                        $scope.event.date = new Date(response.date);
                        return EventService.findInviteesByIds($scope.event._id);
                    })
                    .then(function (invitees) {
                        var index = invitees.map(function(x) {return x._id; }).indexOf($scope.event.hostId);
                        invitees.splice(index,1);
                        $scope.event.invitees = invitees;
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