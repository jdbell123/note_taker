// import dependency libraires
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

// Exports all of the app.get methods for the API database calls as a function to be used in server.js
module.exports = (app) => {

    let notesData = [];

    app.get('/api/notes', (req, res) => {

        notesData = fs.readFileSync((path.join(__dirname, '../db/db.json')));
        notesData = JSON.parse(notesData)
        console.log(notesData);
        res.json(notesData);

    })

    app.post('/api/notes', (req, res) => {
        notesData = fs.readFileSync((path.join(__dirname, '../db/db.json')));
        notesData = JSON.parse(notesData)
        const newNote = req.body;
        newNote.id = uniqid()
        notesData.push(newNote);
        fs.writeFile((path.join(__dirname, '../db/db.json')), JSON.stringify(notesData, '\t'), function (err) {

            if (err) {
                console.log(err);
            }
            else {
                console.log("New Note logged!");
            }

        });
        res.json(notesData);

    });

    app.delete('/api/notes/:id', (req, res) => {
        const id = req.params.id;
        let result = true;

        // Read in the current JSON file
        notesData = fs.readFileSync((path.join(__dirname, '../db/db.json')));
        notesData = JSON.parse(notesData);
        // Remove the selected element
        notesData = notesData.filter(note => note.id != id);
        // Write the new json string to db
        fs.writeFile((path.join(__dirname, '../db/db.json')), JSON.stringify(notesData), function (err) {
            if (err) return console.log(err);
            result = false;
        });

        res.json("Delete is successful!");
        return result;
    });

};