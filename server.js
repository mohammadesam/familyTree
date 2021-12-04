const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const addPersonRoute = require("./routes/addPerson");
const editPersonRoute = require("./routes/edit");
const usersRoute = require("./routes/usersRoute");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

dotenv.config();
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const connection = mongoose.connection;
let connected = false;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
  connected = true;
});

const data = require("./scripts/main.js");
const person = require("./models/person");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(upload.array());
app.use(cookieParser());

// routes import
app.use("/add", addPersonRoute);
app.use("/admin/edit", editPersonRoute);
app.use("/users", usersRoute);

// authenticateToken
function isAuthenticated(req, res, next) {
  // Gather the jwt access token from the request header
  const token = req.cookies["jwtToken"];

  if (token == null) return false; // if there isn't any token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return false;
    req.user = user;
    return true; // pass the execution off to whatever request the client intended
  });
}
//!routes import
app.get("/", (req, res) => {
  if (!connected) {
    res.render("home", { con: false });
  } else {
    isAuthenticated(req, res);
    let isLoggedIn = req.user ? true : false;
    console.log(req.user);
    res.render("home", { con: true, isLoggedIn, name: req.user?.name || " " });
  }
});
app.get("/tree", (req, res) => {
  person.find({}, (err, people) => {
    if (err) return err;
    let obj = {};
    let mydata = [];
    people.forEach((one) => {
      obj[one._id] = one;
      mydata.push(one);
    });
    res.render("index", {
      data: JSON.stringify(data.getJson(mydata)),
      dataObject: JSON.stringify(obj),
    });
  });
});

app.get("/admin", (req, res) => {
  person.find({}, (err, people) => {
    if (err) return err;
    let arr = {};
    let mydata = [];
    people.forEach((one) => {
      arr[one._id] = one;
      mydata.push(one);
    });
    res.render("admin", {
      data: JSON.stringify(data.getJson(mydata, "admin")),
    });
  });
});

app.get("/admin/delete/:id", (req, res) => {
  if (req.query.confirm == "true") {
    person.find({}, (err, people) => {
      if (err) return err;
      let myarr = [];
      people.forEach((one) => {
        myarr.push(one);
      });
      let parent = myarr.filter((one) => one._id == req.params.id)[0];
      let subNodes = [];
      let resolvedData = data.getSubSons(parent, myarr);
      for (let node in resolvedData) {
        subNodes.push(node);
      }

      person.deleteMany(
        {
          _id: {
            $in: [req.params.id, ...subNodes],
          },
        },
        (err, result) => {
          if (err) console.log(err);
          console.log("deleted : " + result.deletedCount);
          res.redirect("/admin");
        }
      );
    });
  } else {
    res.redirect("/admin");
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});
const port = process.env.PORT || 3000;
app.listen(port);
