const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');

const UserLib = require('./library/user-lib.js');

// TODO: Use config file or env vars for database name and port
const MONGODB_URI = 'mongodb://localhost:27017/basicgram-database';
const port = 3003;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log("ERROR: " + error);
});

const app = express();
app.use(cookieParser());
app.use(bodyParser());
// TODO: Validate requests either here using express-validator or with custom validator library


app.get('/user/:id', (req, res) => {
    // TODO: RETURN USER INFO
    console.log(req.params.id);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
