require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Recycling Center Schema
const RecyclingCenterSchema = new mongoose.Schema({
  name: String,
  type: String, // Type of recyclable (e.g., Plastic, Paper, Metal, etc.)
  location: String // Location of the recycling center
});

const RecyclingCenter = mongoose.model('RecyclingCenter', RecyclingCenterSchema);

// Recycling Centers Data to be inserted
const recyclingCenters = [
  {
    name: 'Tripoli Recycling Center',
    type: 'Plastic',
    location: 'Tripoli, Lebanon'
  },
  {
    name: 'Akkar Recycling Center',
    type: 'Paper',
    location: 'Akkar, Lebanon'
  },
  {
    name: 'Beirut Recycling Center',
    type: 'Metal',
    location: 'Beirut, Lebanon'
  },
  {
    name: 'Sfire Recycling Center',
    type: 'Glass',
    location: 'Sfire, Lebanon'
  },
  {
    name: 'Saida Recycling Center',
    type: 'Plastic',
    location: 'Saida, Lebanon'
  }
];

// Insert data into MongoDB
async function insertRecyclingCenters() {
  try {
    await RecyclingCenter.insertMany(recyclingCenters);
    console.log('Recycling Centers Added Successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error Adding Recycling Centers:', error);
    mongoose.connection.close();
  }
}

insertRecyclingCenters();
