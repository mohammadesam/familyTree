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
dotenv.config();
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("hiii"))
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
app.use("/add", addPersonRoute);
app.use("/admin/edit", editPersonRoute);
app.use("/users", usersRoute);
//!routes

app.get("/", (req, res) => {
  if (!connected) {
    res.render("home", { con: false });
  } else {
    res.render("home", { con: true });
  }
});
app.get("/tree", (req, res) => {
  person.find({}, (err, people) => {
    if (err) return err;
    let arr = {};
    let mydata = [];
    people.forEach((one) => {
      arr[one._id] = one;
      mydata.push(one);
    });
    res.render("index", {
      data: JSON.stringify(data.getJson(mydata)),
      dataObject: JSON.stringify(arr),
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

const port = process.env.PORT || 3000;
app.listen(port);
