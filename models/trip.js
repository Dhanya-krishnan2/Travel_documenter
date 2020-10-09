const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const tripSchema = new Schema({
    tripId: { type: String },
    tripName: { type: String, required: true },
    people: [{type: String}],
    type: {type: String},
    lat: {type: String, trim: true,required: true},
    long: {type: String, trim: true, required: true},
    description: {type: String, required: true},
    image: {type: String, trim: true},
    date: { type: Date, default: Date.now },
    });
  
  const Trip = mongoose.model("Trip", tripSchema);
  
  module.exports = Trip;