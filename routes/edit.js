const express = require("express");
const editPersonRoute = express.Router();
const mongoose = require("mongoose");
const Person = require("../models/person");

editPersonRoute.get("/:id", (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) console.log(err);
    Person.findById(person.father, (err1, fatherInfo) => {
      if (err) console.log(err);
      console.log(fatherInfo);
      res.render("edit", {
        name: person.name,
        partner: person.partner,
        gender: person.gender,
        mother: person.mother,
        Father: person.Father,
        father: fatherInfo,
      });
    });
  });
});

module.exports = editPersonRoute;
