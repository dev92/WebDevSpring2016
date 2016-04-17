"use strict";


module.exports = function(app, eventModel) {


    app.post("/api/project/event", userCreatesEvent);
    app.delete("/api/project/host/:hostId/event/:eventId", deleteEvent);
    app.delete("/api/project/user/:userId/event/:eventId", userCannotAttend);
    app.put("/api/project/event/:eventId", updateEvent);
    app.get("/api/project/user/:userId/event", findUserEvents);





    function userCreatesEvent(req,res){

        var event = req.body;

        eventModel
            .CreateEvent(event)
            .then(function(newevent){
                //console.log(users);
                res.json(newevent);
            },function(err){

                res.status(400).send(err);
            });
    }

    function deleteEvent(req, res){

        var eventId = req.params.eventId;
        var hostId = req.params.hostId;

        eventModel.DeleteEvent(eventId)
            .then(
                function (response) {
                    return eventModel.FindEventsByUserId(hostId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(function(events){

                res.json(events)

            },function(err){

                res.status(400).send(err);
            });
    }

    function userCannotAttend(req,res){

        var eventId = req.params.eventId;
        var userId = req.params.userId;

        eventModel.RemoveUser(eventId,userId)
            .then(
                function (response) {
                    return eventModel.FindEventsByUserId(userId);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(function(events){

                res.json(events)

            },function(err){

                res.status(400).send(err);
            });
    }


    function updateEvent(req,res){

        var eventId = req.params.eventId;

        eventModel.UpdateEvent(eventId,req.body)
            .then(
                function (response) {

                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserEvents(req, res) {

        eventModel.FindEventsByUserId(req.params.userId)
            .then(function (events) {
                res.json(events);
            }, function (err) {
                res.status(400).send(err);
            });
    }


}