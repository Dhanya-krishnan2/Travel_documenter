const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
const URI = process.env.MONGODB_URI || 'mongodb://localhost/trip-report';

mongoose.connect(URI, {
    //added to avoid deprecated warning on terminal
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connected")
}).catch(err => {
    console.log('DB Connection ERROR: ', err)
});






// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

