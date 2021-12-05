const express = require("express");
const usersRoute = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
dotenv.config();

usersRoute.get("/", authenticateToken, (req, res) => {
  if (req.user.role == "admin") {
    res.render("adminPanel", { name: req.user.name });
  } else {
    res.redirect("/tree");
  }
});

usersRoute.get("/login", (req, res) => {
  let msg = req.query.msg || " ";
  res.render("login", { type: "login", msg });
});

usersRoute.get("/register", (req, res) => {
  User.find({}, (err, users) => {
    let usersArr = [];
    for (let user of users) {
      usersArr.push(user.userName);
    }
    console.log(usersArr);
    res.render("login", { type: "register", users: JSON.stringify(usersArr) });
  });
});

usersRoute.post("/login", async (req, res) => {
  if (mongoose.connection.readyState != 1) {
    res.redirect("/login");
    return;
  }

  User.find({ userName: req.body.name }, async (err, result) => {
    console.log(result);
    const user = result[0];
    const allowed = await bcrypt.compare(req.body.password, user.password);

    if (allowed) {
      let token = generateAccessToken(
        { id: user._id, role: user.role, name: user.userName },
        req,
        res
      );
      res.redirect("/users");
    } else {
      res.redirect("/users/login?msg=كلمة سر خاطئة");
    }
  });
});

usersRoute.post(
  "/register",
  authenticateToken,
  validteInputs,
  async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password1, 10);
      User.create(
        {
          _id: mongoose.Types.ObjectId(),
          userName: req.body.name,
          password: hashedPassword,
          role: req.body.userType,
        },
        (err, user) => {
          if (err)
            return res
              .status(500)
              .send("There was a problem registering the user.");
          // create a token

          let token = generateAccessToken(
            { id: user._id, role: user.role, name: user.userName },
            req,
            res,
            true
          );

          res.status(200).redirect("/");
        }
      );
    } catch {
      res.send("some thing went Wrong");
    }
  }
);

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const token = req.cookies["jwtToken"];

  if (token == null) return res.redirect("/users/login"); // if there isn't any token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.redirect("/users/login");
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

function validteInputs(req, res, next) {
  let name = req.body.name;
  let password1 = req.body.password1;
  let password2 = req.body.password2;

  if (password1 == password2 && name != undefined && password1.length > 5) {
    next();
    return;
  }
  return res.send("bad Inputs");
}

function generateAccessToken(user, req, res, newUser) {
  let token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 86400000,
  });
  let cookie = req.cookies.jwtToken;
  if (!cookie || newUser || cookie != token) {
    res.cookie("jwtToken", token, { maxAge: 86400000, httpOnly: true });
    return token;
  } else {
    console.log("samm...");
    return cookie;
    // send cookie along to the validation functions...
  }
}
module.exports = usersRoute;
