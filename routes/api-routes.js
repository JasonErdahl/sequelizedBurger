// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// grab the orm from the config
// (remember: connection.js -> orm.js -> route file)
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/todos", function(req, res) {

    db.Todo.findAll({}).then(function(dbTodo) {
      res.json(dbTodo);
    })

  });

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/api/todos", function(req, res) {
    console.log(req.body.text);

    db.Todo.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbTodo){
      res.json(dbTodo);
    })

  });

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  app.delete("/api/todos/:id", function(req, res) {

    db.Todo.destroy({where:{
      id: req.params.id
    }}).then(function(dbTodo){
      res.json(dbTodo);
    })

  });

  // PUT route for updating todos. We can access the updated todo in req.body
  // app.update("/api/todos", function(req, res) {
  app.put("/api/todos", function(req, res) {
    db.Todo.update({ complete: req.body.complete, text: req.body.text}, {where: {id: req.body.id}}).then(function(dbTodo){
      res.json(dbTodo);
    });
  });




};



