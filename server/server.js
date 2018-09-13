var express = require("express");
var bodyParser = require("body-parser");
var underscore = require("underscore");
var path = require("path");

module.exports = function(port, middleware, callback) {
    var app = express();
    if (middleware) {
        app.use(middleware);
    }
    app.use(express.static("dist/todo-Angular"));
    app.use(bodyParser.json());
    var latestId = 0;
    var todos = [];

    // Get all
    app.get("/api/todo", function(req, res) {
        res.json(todos);
    });

    //Get one
    app.get("/api/todo:id", function(req, res) {
        res.json(todos.filter(todo => todo.id === id));
    })
    
    //Redirect all other get requests to index.html so does not crash on refresh
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../dist/todo-Angular/index.html'), function(err) {
            if (err) {
            res.status(500).send(err)
            }
        })
    })

    // Create
    app.post("/api/todo", function(req, res) {
        var todo = req.body;
        todo.id = latestId.toString();
        todo.isComplete = false;
        latestId++;
        todos.push(todo);
        res.set("Location", "/api/todo/" + todo.id);
        res.status(201).json(todo);
    });

    //Update
    app.post("/api/todo/:id", function(req, res) {
        var id = req.params.id;
        var todo = getTodo(id);
        if (todo) {
            todo.isComplete = !todo.isComplete
            res.status(200).send({result: "success"});
        }
        else {
            res.status(404).send({result: "failed"});
        }
    });

    // Delete
    app.delete("/api/todo/:id", function(req, res) {
        var id = req.params.id;
        var todo = getTodo(id);
        if (todo) {
            todos = todos.filter(function(otherTodo) {
                return otherTodo !== todo;
            });
            res.status(200).send({result: "success"});
        } else {
            res.status(404).send({result: "failed"});
        }
    });

    function getTodo(id) {
        return underscore.find(todos, function(todo) {
            return todo.id === id;
        });
    }

    var server = app.listen(port, callback);

    // We manually manage the connections to ensure that they're closed when calling close().
    var connections = [];
    server.on("connection", function(connection) {
        connections.push(connection);
    });
};
