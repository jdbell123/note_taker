// import dependency libraires
const path = require('path');

// Exports all of the app.get methods for the html pages as a function to be used in server.js
module.exports = (app) => {

  // for the notes page
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
  });

  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'))
  })
  // If no matching route is found default to home
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  
};
