const mongoose = require("mongoose");
const RecyclingCenter = require("./models/RecyclingCenter"); // Adjust the path to your model

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://hassan:hassan@cluster0.t8kxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Array of 20 recycling centers
const recyclingCenters = [
    {
        name: "Green Earth Recycling",
        location: { type: "Point", coordinates: [-74.0060, 40.7128] }, // New York
        address: "123 Green St, New York, NY",
        materialsAccepted: ["plastic", "metal", "paper"],
        phone: "123-456-7890",
        whatsapp: "123-456-7890"
    },
    {
        name: "Eco-Friendly Recyclers",
        location: { type: "Point", coordinates: [-118.2437, 34.0522] }, // Los Angeles
        address: "456 Eco Ave, Los Angeles, CA",
        materialsAccepted: ["glass", "plastic", "electronics"],
        phone: "987-654-3210",
        whatsapp: "987-654-3210"
    },
    {
        name: "Sunshine Recycling Center",
        location: { type: "Point", coordinates: [-80.1918, 25.7617] }, // Miami
        address: "789 Sunshine Blvd, Miami, FL",
        materialsAccepted: ["plastic", "electronics", "textiles"],
        phone: "555-123-4567"
    },
    {
        name: "Ocean Recyclers",
        location: { type: "Point", coordinates: [-122.4194, 37.7749] }, // San Francisco
        address: "321 Ocean Rd, San Francisco, CA",
        materialsAccepted: ["plastic", "metal", "batteries"],
        phone: "555-987-6543",
        whatsapp: "555-987-6543"
    },
    {
        name: "Nature's Way Recycling",
        location: { type: "Point", coordinates: [-87.6298, 41.8781] }, // Chicago
        address: "654 Nature St, Chicago, IL",
        materialsAccepted: ["plastic", "paper", "organic waste"],
        phone: "111-222-3333"
    },
    {
        name: "GreenCycle Hub",
        location: { type: "Point", coordinates: [-95.3698, 29.7604] }, // Houston
        address: "987 Greenway, Houston, TX",
        materialsAccepted: ["plastic", "glass", "batteries"],
        phone: "222-333-4444"
    },
    {
        name: "City Recyclers",
        location: { type: "Point", coordinates: [-77.0369, 38.9072] }, // Washington, DC
        address: "741 City Ave, Washington, DC",
        materialsAccepted: ["electronics", "paper", "plastic"],
        phone: "333-444-5555"
    },
    {
        name: "ReEarth Center",
        location: { type: "Point", coordinates: [-104.9903, 39.7392] }, // Denver
        address: "852 ReEarth St, Denver, CO",
        materialsAccepted: ["plastic", "metal", "batteries"],
        phone: "444-555-6666"
    },
    {
        name: "Recycle Right",
        location: { type: "Point", coordinates: [-81.3792, 28.5383] }, // Orlando
        address: "159 Recycle Ln, Orlando, FL",
        materialsAccepted: ["glass", "plastic", "textiles"],
        phone: "555-666-7777"
    },
    {
        name: "EcoWorld Recyclers",
        location: { type: "Point", coordinates: [-71.0589, 42.3601] }, // Boston
        address: "357 EcoWorld Blvd, Boston, MA",
        materialsAccepted: ["plastic", "paper", "organic waste"],
        phone: "666-777-8888"
    },
    {
        name: "Urban Waste Solutions",
        location: { type: "Point", coordinates: [-90.1994, 38.6270] }, // St. Louis
        address: "951 Urban Dr, St. Louis, MO",
        materialsAccepted: ["electronics", "plastic", "metal"],
        phone: "777-888-9999"
    },
    {
        name: "ReUse & Recycle",
        location: { type: "Point", coordinates: [-86.1581, 39.7684] }, // Indianapolis
        address: "753 ReUse Ave, Indianapolis, IN",
        materialsAccepted: ["paper", "metal", "textiles"],
        phone: "888-999-0000"
    },
    {
        name: "EcoHarbor",
        location: { type: "Point", coordinates: [-97.7431, 30.2672] }, // Austin
        address: "357 EcoHarbor St, Austin, TX",
        materialsAccepted: ["plastic", "glass", "organic waste"],
        phone: "999-000-1111"
    },
    {
        name: "Go Green Recycling",
        location: { type: "Point", coordinates: [-112.0740, 33.4484] }, // Phoenix
        address: "258 Green Rd, Phoenix, AZ",
        materialsAccepted: ["plastic", "batteries", "textiles"],
        phone: "000-111-2222"
    },
    {
        name: "Second Life Recyclers",
        location: { type: "Point", coordinates: [-84.3880, 33.7490] }, // Atlanta
        address: "369 Second Life St, Atlanta, GA",
        materialsAccepted: ["electronics", "metal", "plastic"],
        phone: "111-222-3333"
    },
    {
        name: "Sustainable Recycling",
        location: { type: "Point", coordinates: [-93.2650, 44.9778] }, // Minneapolis
        address: "741 Sustainable Ln, Minneapolis, MN",
        materialsAccepted: ["paper", "plastic", "glass"],
        phone: "222-333-4444"
    },
    {
        name: "EcoPlanet Recycling",
        location: { type: "Point", coordinates: [-122.3321, 47.6062] }, // Seattle
        address: "753 EcoPlanet Ave, Seattle, WA",
        materialsAccepted: ["plastic", "electronics", "batteries"],
        phone: "333-444-5555"
    },
    {
        name: "Waste Wise Center",
        location: { type: "Point", coordinates: [-79.3832, 43.6532] }, // Toronto
        address: "852 Waste Wise Dr, Toronto, ON",
        materialsAccepted: ["plastic", "metal", "paper"],
        phone: "444-555-6666"
    },
    {
        name: "Planet Save Recycling",
        location: { type: "Point", coordinates: [-114.0719, 51.0447] }, // Calgary
        address: "159 Planet Save St, Calgary, AB",
        materialsAccepted: ["plastic", "glass", "organic waste"],
        phone: "555-666-7777"
    }
];

// Insert data into MongoDB
async function seedDatabase() {
    try {
        await RecyclingCenter.insertMany(recyclingCenters);
        console.log("✅ Successfully inserted 20 recycling centers!");
    } catch (error) {
        console.error("❌ Error inserting data:", error);
    } finally {
        mongoose.disconnect();
    }
}

// Run the function
seedDatabase();
