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
        id: req.params.id,
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

editPersonRoute.post("/:id", async (req, res) => {
  let person = await Person.findById(req.params.id);
  const partner = [];

  for (let i = 1; i < 30; i++) {
    if (req.body[`partner${i}`]) {
      if (
        req.body[`partner${i}`] == "" ||
        req.body[`partner${i}`] == undefined
      ) {
        continue;
      }
      partner.push(req.body[`partner${i}`]);
    } else {
      break;
    }
  }

  person.name = req.body.name;
  person.partner = partner;
  person.gender = req.body.gender;

  person
    .save()
    .then(() => {
      console.log("person edited");
      res.redirect("/admin");
    })
    .catch((err) => console.log(err));
});

module.exports = editPersonRoute;
