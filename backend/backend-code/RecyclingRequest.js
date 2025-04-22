const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recyclingRequestSchema = new Schema({
  materialType: { type: String, required: true },
  recyclingCenter: { type: mongoose.Schema.Types.ObjectId, ref: 'RecyclingCenter', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const RecyclingRequest = mongoose.model('RecyclingRequest', recyclingRequestSchema);
module.exports = RecyclingRequest;