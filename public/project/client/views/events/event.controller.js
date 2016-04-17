(function () {
    'use strict';
    angular
        .module('CinephiliaApp')
        .controller('EventsController', EventsController);


    function EventsController ($mdConstant,$scope,$rootScope,EventService) {

        $scope.events = []

        EventService.findAllEventsForUser($rootScope.currentusr._id)
            .then(function(events){
                $scope.events = events;
            });
    }
})();