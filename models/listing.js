mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    type: String,
    price: Number,
    monthlyfee: Number,
    active: Number,
    location: {
      street: String,
      number: Number,
      city: String,
      municipality: String,
      country: String,
      lat: Number,
      lon: Number
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
