const express = require("express");
const bodyParser = require("body-parser");
// const { MongoClient } = require("mongodb");
const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST || "localhost"
});
const app = express();
// var middleware = require("../middleware");
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

const { MongoClient, ObjectID } = require("mongodb");
const url = process.env.MONGO_HOST || "mongodb://localhost:27017";
const dbName = "basicgram-database";
const mongoClient = new MongoClient(url);

//INDEX - show all basicgrams or basicgrams of search result
mongoClient.connect(err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Connected successfully to db");
  const db = mongoClient.db(dbName);

  // create collection. If already exists, ignores by default
  const collection = db.collection("basicgrams", function(err, collection) {});

  app.post("/basicgrams", upload.single("image"), function(req, res) {
    cloudinary.uploader.upload(req.file.path, function(err, result) {
      if (err) {
        req.flash("image upload error", err.message);
        return res.redirect("back");
      }
      req.body.basicgram.image = result.secure_url; // see cloudinary npm doc
      req.body.basicgram.imageThumbnail =
        "http://res.cloudinary.com/dzjtqbbua/image/upload/c_fit,h_400,w_400/" +
        result.public_id;
      req.body.listing.author = {
        id: req.user._id,
        username: req.user.username
      };
      let body = req.body.basicgram;

      if (!body) {
        return res.send({
          status: false
        });
      }
      const document = { body };
      collection
        .insertOne(document)
        .then(response => {
          if (response) {
            console.log("New basicgram added");
            return res.redirect("/basicgrams");
          } else {
            return res.send({
              status: false
            });
          }
        })
        .catch(e => {
          console.log(e.message);
          return res.send({
            status: false
          });
        });
    });
  });

  app.get("/basicgrams", function(req, res) {
    db.collection("basicgrams")
      .find({})
      .toArray()
      .then(allbasicgrams => {
        console.log(allbasicgrams);
        console.log("Succesfully got allbasicgrams");
        allbasicgrams = allbasicgrams || []; // some checking
        res.send({
          basicgrams: allbasicgrams
        });
      })
      .catch(e => {
        console.log(e.message);
        res.send({
          status: false
        });
      });
  });

  app.listen(5000);
});

app.get("basicgrams/new", function(req, res) {});

app.get("basicgrams/:id", function(req, res) {
  Basicgram.findById(req.params.id).exec(function(err, foundBasicgram) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundBasicgram);
      res.send({
        basicgram: foundBasicgram,
        commentsFound: [] // TODO add comments query
      });
    }
  });
});

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
