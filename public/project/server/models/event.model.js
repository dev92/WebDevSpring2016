var q = require("q");

module.exports = function(mongoose,db) {

    var EventSchema = require('./event.schema.server.js')(mongoose);
    var EventModel  = db.model("EventModel", EventSchema);

    var api = {
        findEventByID: findEventByID,
        FindEventsByUserId: FindEventsByUserId,
        CreateEvent: CreateEvent,
        UpdateEvent: UpdateEvent
    };
    return api;



    function FindEventsByUserId (userId) {

        var deferred = q.defer();

        EventModel.find({"invitees": userId},function(err,events){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(events);
            }
        });

        return deferred.promise;
    }

    function CreateEvent(event) {

        var deferred = q.defer();

        EventModel.create(event, function(err, createdEvent) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(createdEvent);
            }
        });
        return deferred.promise;
    }

    function findEventByID(eventId) {

        var deferred = q.defer();

        EventModel.findById(eventId, function(err, event) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(event);
            }
        });
        return deferred.promise;
    }

    function UpdateEvent(id, event) {

        var deferred = q.defer();

        EventModel.findById(id, function (err, eventToUpdate) {
            if (err) {
                deferred.reject(err);
            } else {
                eventToUpdate.hostId = event.hostId;
                eventToUpdate.movieName = event.movieName;
                eventToUpdate.address = event.address;
                eventToUpdate.city = event.city;
                eventToUpdate.state = event.state;
                eventToUpdate.zip = event.zip;
                eventToUpdate.email = event.email;
                eventToUpdate.phone = event.phone;
                eventToUpdate.date = event.date;
                eventToUpdate.invitees = event.invitees;

                eventToUpdate.save(function (err, updatedEvent) {
                    deferred.resolve(updatedEvent);
                });
            }
        });
        return deferred.promise;
    }


}