(function () {
    'use strict';
    angular
        .module('CinephiliaApp')
        .controller('EventsController', EventsController);


    function EventsController ($mdConstant,$scope,$rootScope,EventService) {

        $scope.events = [];

        EventService.findAllEventsForUser($rootScope.currentusr._id)
            .then(function(events){
                $scope.events = events;
            });

        $scope.deleteEvent = function(event){
            EventService.deleteEvent(event._id,event.hostId)
                .then(function(events){
                    $scope.events = events;
                });
        }

        $scope.notAttending = function(event){
            EventService.deleteEventForUser($rootScope.currentusr._id,event._id)
                .then(function(events){
                    $scope.events = events;
                });
        }
    }
})();