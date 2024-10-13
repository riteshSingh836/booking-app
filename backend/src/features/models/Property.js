const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  amenities: [String],
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
