const mongoose = require('mongoose');

const Post = require('../models/post-model.js');

const ObjectId = mongoose.Types.ObjectId;

/*
const MONGODB_URI = 'mongodb://localhost:27017/667Database';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on('error', (error) => {
    console.log("ERROR: " + error);
});
*/


class NotesLibrary {
    // TODO: How do we handle image upload/post?
    static createPost(created_by, caption, image, ws) {
        const newNote = new Note({
            body: body,
            created_at: new Date(),
            created_by: new ObjectId(userId)
        });

        newNote.save((err) => {
            if (err) throw err;
            else {
                ws.send("Success!");
            }
        });
    };

    static editNote(noteId, body, ws) {
        const updatedNote = {
            body: body
        };

        Note.findByIdAndUpdate(noteId, updatedNote, err => {
            if (err) throw err;
            else {
                ws.send("Success!");
            }
        })
    };

    static getNoteById(noteId, ws) {
        Note.findById(noteId, function(err, note) {
            if (err) throw err;
            ws.send(JSON.stringify(note));
        });
    }

    static getNoteByUser(userId, ws) {
        Note.find({ user_id: new ObjectId(userId) }, function(err, notes) {
            if (err) throw err;
            ws.send(JSON.stringify(notes));
        });
    }

    static getAllNotes(ws) {
        Note.find({}, function(err, notes) {
            if (err) throw err;
            ws.send(JSON.stringify({
                type: 'GET_ALL_NOTES',
                notes: notes
            }));
        });
    }

    static verifyRequest(cookies) {
        return axios.post('/auth/verify', {
            token: cookies.token,
            userId: cookies.userId
        });
    }
}

module.exports = NotesLibrary;
