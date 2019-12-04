const express = require("express");
const app = express();

const mongoose = require("mongoose");
const User = require("../models/user-model.js");
const Basicgram = require("../models/basicgramModel");
const Comment = require("../models/comment");
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

// Shows comment form
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

// CREATE comment
// TODO add auth
app.post("/comments", function(req, res) {
  Basicgram.findById(req.params.id, function(err, basicgram) {
    if (err) {
      console.log(err);
      res.redirect("/basicgrams");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          //Attach id and username to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save(); //Save comment to DB
          //basicgram.comments.push(comment);
          basicgram.save();
          console.log("Comment Sent");
          console.log(comment);
          console.log(" ");
          req.flash("success", "Your comment has been sent!");
          res.redirect("/basicgrams/" + basicgram._id);
        }
      });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
