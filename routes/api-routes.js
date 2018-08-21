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

  // GET route for getting all of the burgers
  app.get("/api/burgers", function(req, res) {
      console.log("**********routes/api-routes");
    db.Burgers.findAll({}).then(function(dbBurgers) {
      res.json(dbBurgers);
    })

  });

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/api/burgers", function(req, res) {
    console.log(req.body.burger_name);

    db.Burgers.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(dbBurgers){
      res.json(dbBurgers);
    })

  });

  // DELETE route for deleting burgers. We can access the ID of the todo to delete in
  // req.params.id
  app.delete("/api/burgers/:id", function(req, res) {

    db.Burgers.destroy({where:{
      id: req.params.id
    }}).then(function(dbBurgers){
      res.json(dbBurgers);
    })

  });

  // PUT route for updating burgers. We can access the updated todo in req.body
  // app.update("/api/burgers", function(req, res) {
  app.put("/api/burgers/:id", function(req, res) {
    db.Burgers.update({ devoured: req.body.devoured}, {where: {id: req.params.id}}).then(function(dbBurgers){
      res.json(dbBurgers);
    });
  });




};



