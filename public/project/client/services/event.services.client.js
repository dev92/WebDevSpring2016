(function()
{
    angular
        .module("CinephiliaApp")
        .factory("UserService", UserService);

    function EventService($http,$q)
    {


        var service = {
            findAllEventsForUser : findAllEventsForUser,
            deleteEventForUser : deleteEventForUser,
            updateEvent : updateEvent,
            createEvent : createEvent
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




    }
})();