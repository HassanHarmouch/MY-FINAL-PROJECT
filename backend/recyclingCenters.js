// recyclingCenters.js
const mongoose = require('mongoose');
const RecyclingCenter = require('./models/RecyclingCenter'); // Adjust the path if necessary

// Sample data for 10 recycling centers
const recyclingCenters = [
  {
    name: 'Green Earth Recycling',
    location: '123 Green St, Cityville',
    materialsAccepted: ['Paper', 'Plastic', 'Glass']
  },
  {
    name: 'Eco Recycle Hub',
    location: '456 Eco Rd, Townsville',
    materialsAccepted: ['Plastic', 'Metal', 'Electronics']
  },
  {
    name: 'Waste Not Recycling Center',
    location: '789 Waste Ave, Citytown',
    materialsAccepted: ['Paper', 'Metal', 'Glass']
  },
  {
    name: 'Recyclico',
    location: '101 Recycle Blvd, Metropolis',
    materialsAccepted: ['Plastic', 'Paper', 'Batteries']
  },
  {
    name: 'EcoCycle',
    location: '202 Green Way, Springdale',
    materialsAccepted: ['Glass', 'Paper', 'Plastic']
  },
  {
    name: 'GreenTech Recycling',
    location: '303 Greenfield Dr, Lakeside',
    materialsAccepted: ['Metal', 'Plastic', 'E-waste']
  },
  {
    name: 'The Recycling Spot',
    location: '404 Recycle Ln, Parkside',
    materialsAccepted: ['Glass', 'Paper', 'Plastic']
  },
  {
    name: 'Cycle Again',
    location: '505 Green Park, Rivertown',
    materialsAccepted: ['Plastic', 'Metal', 'E-waste']
  },
  {
    name: 'Planet Recycle',
    location: '606 Eco Rd, Greenfield',
    materialsAccepted: ['Plastic', 'Glass', 'Metal']
  },
  {
    name: 'Zero Waste Recycling Center',
    location: '707 Waste Blvd, Hightown',
    materialsAccepted: ['Paper', 'Metal', 'Plastic']
  }
];

// MongoDB Atlas connection URI with the test database
const mongoURI = 'mongodb+srv://hassan:hassan@cluster0.t8kxf.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB and insert data
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return RecyclingCenter.insertMany(recyclingCenters);
  })
  .then(() => {
    console.log('Recycling centers inserted successfully!');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting recycling centers:', error);
  });