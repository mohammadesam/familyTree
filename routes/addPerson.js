const express = require("express");
const addPersonRoute = express.Router();
const mongoose = require("mongoose");
const Person = require("../models/person");

addPersonRoute.get("/root", (req, res) => {
  Person.findOne({ father: null }, (req, data) => {
    let URL = "root?id=" + data._id;
    res.render("addPerson", { dist: URL });
  });
});

addPersonRoute.get("/:id", (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) console.log(err);
    res.render("addPerson", {
      dist: req.params.id,
      gender: person.gender,
      wifes: person.partner,
      name: person.name,
    });
  });
});

addPersonRoute.post("/root", (req, res) => {
  let person = new Person({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    father: null,
    mother: null,
    gender: req.body.gender,
    sons: [],
  });

  person
    .save()
    .then((newRoot) => {
      Person.findById(req.query.id, (req, oldFather) => {
        console.log(newRoot);
        oldFather.father = newRoot._id;
        oldFather
          .save()
          .then(() => {
            console.log(oldFather);
            res.redirect("/admin");
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err + "error hapended"));
});

addPersonRoute.post("/:id", (req, res) => {
  let father = req.query.gender == "male" ? req.query.name : req.query.parent;
  let mother = req.query.gender == "female" ? req.query.name : req.body.parent;
  let partner = [];
  for (let i = 1; i <= 30; i++) {
    const key = "partner" + i;
    if (req.body[key] != undefined) partner.push(req.body[key]);
    else break;
  }
  let person = new Person({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    father: req.params.id,
    Father: father,
    mother: mother,
    gender: req.body.gender,
    partner: partner,
    sons: [],
  });
  person
    .save()
    .then(() => res.redirect("/admin"))
    .catch((err) => console.log(err + "error hapended"));
});

module.exports = addPersonRoute;
