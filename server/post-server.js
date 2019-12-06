const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressWs = require('express-ws');
const http = require('http');
const mongoose = require('mongoose');
const NotesLib = require('./library/notes.js');
const redis = require('redis');
const WebSocket = require('ws');

const client = redis.createClient();
const MONGODB_URI = 'mongodb://localhost:27017/basicgram-database';
const port = 3001;

const app = express();
app.use(cookieParser());
app.use(bodyParser);
expressWs(app);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const broadcastMessage = (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message)); //server to client
        }
    });
};

const updateUserCount = () => {
    broadcastMessage({
        type: 'UPDATE_USER_COUNT',
        count: wss.clients.size,
    });
};

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log("ERROR: " + error);
});

app.use((req, res, next) => {
    console.log("Cookies from request: " + req.cookies);
    NotesLib.verifyRequest(req.cookies).then((verificationResponse) => {
        if (verificationResponse.valid) {
            return next();
        } else {
            res.status(403);
            return res.send('You need access to this endpoint!');
        }
    });
});

wss.on('connection', (ws) => {
    console.log('Someone has connected');

    client.incr('myCounter', (err, updatedValue) => {
        // console.log('Hitting service', process.env.NODE_APP_INSTANCE);
    });
    updateUserCount();

    ws.on('close', () => {
        updateUserCount();
        console.log('someone has disconnected!');
    });

    ws.on('error', (e) => {
        console.log(e);
    });

    ws.on('message', (message) => {
        const messageObject = JSON.parse(message);
        switch (messageObject.type) {
            case 'create_post':
                // NotesLib.createNote(messageObject.newNotes, messageObject.userId, ws);
                break;
            case 'get_posts':
                // NotesLib.getNoteById(params.noteId, ws);
                break;
            case 'get_posts_by_user_id':
                // NotesLib.getNoteByUser(params.userId, ws);
                break;
            default:
                ws.send('Not a function!');
        }
    });
});


server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
