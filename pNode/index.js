const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

// Creating instance of MongClient for mongodb
const client = new MongoClient("mongodb://localhost:27017");

// connect to database
client
  .connect()
  .then(() => {
    console.log("Connected Sucessfully");
    console.log("Exiting...");
    client.close();
  })
  .catch((error) => console.log("Failed to Connect", error));

// this below line of code creates a collection with name customers
mongoose.connect("mongodb://localhost:27017/Users");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/user", (req, res) => {
  let user = new User(req.body);
  user
    .save()
    .then((doc) => {
      res.send(doc);
      console.log(doc, " is doc");
    })
    .catch((error) => console.log(err));
});

app.get("/users", (req, res) => {
  console.log(req.query);
  const { skip, limit } = req.query;
  let numOfDocs;
  let data;
  User.find({}, { password: 0, __v: 0 })
    .limit(limit)
    .skip(skip)
    .then((docs) => {
      data = docs;
      console.log(data, " is docs");
      User.countDocuments()
        .then((value) => {
          numOfDocs = value;
          console.log(numOfDocs);
          res.send({ data: data, count: numOfDocs });
        })
        .catch((err) => console.log(err));
    })
    .catch((error) => console.log(error));
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});
