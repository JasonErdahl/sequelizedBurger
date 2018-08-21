var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Burgers.findAll({}).then(function(dbBurgers) {
      console.log("***********routes/html-routes");

      console.log(dbBurgers)
      res.render("index", {
        msg: "Welcome!",
        burgers: dbBurgers.map( function(instance) { return instance.dataValues})
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/burgers/:id", function(req, res) {
    db.Burgers.findOne({ where: { id: req.params.id } }).then(function(
      dbBurgers
    ) {
      res.render("index", {
        burgers: dbBurgers
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
