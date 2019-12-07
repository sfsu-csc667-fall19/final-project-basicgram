var express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user-model.js");
const Basicgram = require("./models/basicgramModel");
const Comment = require("./models/commentModel");
const ObjectId = mongoose.Types.ObjectId;
const port = 5000;
var multer = require("multer");
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var imageFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("jpg, jpeg, png, or gif format only"), false);
  }
  cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFilter });

var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dzjtqbbua",
  api_key: "559561864892248",
  api_secret: "n1jUnMK_r3B3hGuVIHasS7kHj1Y"
});

const MONGODB_URI = "mongodb://localhost:27017/basicgram-database";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
  mongoose.connection.db.listCollections().toArray(function(err, names) {
    console.log(names); // [{ name: 'dbname.myCollection' }]
  });
});
mongoose.connection.on("error", error => {
  console.log("ERROR: " + error);
});

app.post("/basicgrams", upload.single("image"), function(req, res) {
  console.log("posting new basicgram: ", req.body);
  cloudinary.uploader.upload(req.file.path, function(result) {
    req.body.basicgram.image = result.secure_url; // see cloudinary npm doc
    req.body.basicgram.imageThumbnail =
      "http://res.cloudinary.com/dzjtqbbua/image/upload/c_fit,h_400,w_400/" +
      result.public_id;
    // TODO add author to basicgram
    // req.body.basicgram.author = {
    //   id: req.user._id,
    //   username: req.user.username
    // };
    Basicgram.create(req.body.basicgram, function(err, basicgram) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("back");
      }
      res.redirect("/basicgrams/" + basicgram.id);
    });
  });
});

app.get("/basicgrams", function(req, res) {
  Basicgram.find({}, function(err, allBasicgrams) {
    console.log("allBasicgrams:", allBasicgrams);
    if (err) {
      console.log(err);
    } else {
      res.send({
        basicgrams: allBasicgrams
      });
    }
    // TODO sort reurn
  });
});

app.get("basicgrams/:id", function(req, res) {
  //   Basicgram.findById(req.params.id).exec(function(err, foundBasicgram) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(foundBasicgram);
  //       res.send({
  //         basicgram: foundBasicgram,
  //         commentsFound: [] // TODO add comments query
  //       });
  //     }
  //   });
});

app.listen(port, () => console.log(`/basicgrams listening on port ${port}!`));

// monogo init
// const url = process.env.MONGO_HOST || "mongodb://localhost:27017";
// const mongoClient = new MongoClient(url);

// mongoClient.connect(err => {
//   if (err) console.log(err);
//   const db = mongoClient.db("test101");
//   // move app logic in here
//   const app = express();
//   app.use(bodyParser.json());
//   // sorry for spelling wrong :(
//   app.post("/basicgram/postMessage", (req, res) => {
//     console.log(req.body);
//     db.collection("test")
//       .insertOne({ data: req.body.message })
//       .then(() => console.log("db insert worked"))
//       .catch(e => console.log(e));
//     client.publish("testPublish", req.body.message);
//     res.send("ok");
//   });

//   app.get("/basicgram/getMessages", (req, res) => {
//     db.collection("test")
//       .find({})
//       .toArray()
//       .then(result => {
//         res.send(result.map(r => r.data));
//       })
//       .catch(e => console.log(e));
//   });

//   app.listen(5000);
//   // end app logic
// });

// module.exports = router;
