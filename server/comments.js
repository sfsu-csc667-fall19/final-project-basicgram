const express = require("express");
const app = express();

const mongoose = require("mongoose");
const User = require("../models/user-model.js");
const Basicgram = require("../models/basicgramModel");
const Message = require("../models/message");
const ObjectId = mongoose.Types.ObjectId;

const MONGODB_URI = "mongodb://localhost:27017/basicgram-database";
const port = 3003;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", error => {
  console.log("ERROR: " + error);
});

// Shows message form
// TODO add auth
app.get("/comments/new", function(req, res) {
  console.log(req.params.id);
  Basicgram.findById(req.params.id, function(err, basicgram) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        basicgram: basicgram
      });
    }
  });
});

// CREATE message
// TODO add auth
app.post("/comments", function(req, res) {
  Basicgram.findById(req.params.id, function(err, basicgram) {
    if (err) {
      console.log(err);
      res.redirect("/basicgrams");
    } else {
      Message.create(req.body.message, function(err, message) {
        if (err) {
          console.log(err);
        } else {
          //Attach id and username to message
          message.author.id = req.user._id;
          message.author.username = req.user.username;
          message.save(); //Save message to DB
          //basicgram.messages.push(message);
          basicgram.save();
          console.log("Message Sent");
          console.log(message);
          console.log(" ");
          req.flash("success", "Your message has been sent!");
          res.redirect("/basicgrams/" + basicgram._id);
        }
      });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
