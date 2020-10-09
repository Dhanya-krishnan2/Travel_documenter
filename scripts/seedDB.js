const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/trip-report"
);




const tripSeed = [{
    tripId: "AJK691",
    tripName: "Gods own country",
    people: ["Kunhi Krisnan", "Dhatri Krisnan", "Kurathi Amma"],
    type: "survey",
    lat: "34.838257106021047",
    long: "-86.009409930557013",
    description: "Atlanta America",
    image: "url",
    date: "03/19/2015",
    
},{
  tripId: "AJK197",
  tripName: "Explore Ireland",
  people: ["Kunhikrishnan", "Dhanya krihsnan", "Adithi Krihsnan"],
  type: "vertical",
  lat: "34.804757824167609",
  long: "-86.004965426400304",
  description: "Enjoying Cold",
  image: "url",
  date: "05/19/2007",
  
},{
  tripId: "AJK379",
  tripName: "Education Trip",
  people: ["Krishnan thotty", "Ananth Krisnnan", "Ahalya Krisnana"],
  type: "horizontal",
  lat: "34.968365365639329",
  long: "-85.801903512328863",
  description: "Photo trip",
  image: "url",
  date: "07/23/2015",
  
}]

db.Trip
  .remove({})
  .then(() => db.Trip.collection.insertMany(tripSeed))
  .then(data => {
    console.log("records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
