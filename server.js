// import dependency libraires
const express = require('express');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3030;

// Middleware Express function to serve static files
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Imports the app.get requests from the routes folder
require('./routes/htmlRoutes')(app);
require("./routes/apiRoutes")(app);

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));