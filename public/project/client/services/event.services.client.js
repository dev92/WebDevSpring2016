(function()
{
    angular
        .module("CinephiliaApp")
        .factory("EventService", EventService);

    function EventService($http,$q)
    {


        var service = {
            findAllEventsForUser : findAllEventsForUser,
            findEventById : findEventById,
            findInviteesByIds : findInviteesByIds,
            deleteEventForUser : deleteEventForUser,
            updateEvent : updateEvent,
            createEvent : createEvent,
            deleteEvent : deleteEvent
        };

        return service;



        function findAllEventsForUser(userId) {
            var defer = $q.defer();
            var url = '/api/project/user/'+ userId + '/event';
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }



        function createEvent(event){
            var defer = $q.defer();
            var url = '/api/project/event';
            $http.post(url, event)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }


        function deleteEventForUser(userId,eventId) {
            var defer = $q.defer();
            var url = '/api/project/user/'+ userId + '/event/' + eventId;
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateEvent(eventId, newevent) {
            var defer = $q.defer();
            var url = '/api/project/event/'+ eventId;
            $http.put(url, newevent)
                .success(function(response){
                    console.log(response);
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteEvent(eventId,hostId){
            var defer = $q.defer();
            var url = "/api/project/host/"+hostId+"/event/"+eventId;
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findEventById(eventId){
            var defer = $q.defer();
            var url = '/api/project/event/'+ eventId;
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findInviteesByIds(eventId){
            var defer = $q.defer();
            var url = '/api/project/event/'+ eventId+'/invitees';
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }




    }
})();