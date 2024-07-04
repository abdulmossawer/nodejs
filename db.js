const mongoose = require('mongoose')

// Define the mongoDb connection URL
const mongoURL = 'mongodb://localhost:27017/hotels' // Replace my database name with your database name

// Setup MongoDb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintain a default connection object representing the MongoDb connection 

const db = mongoose.connection;

// Define event listners for database connection 

db.on('connected', ()=>{
    console.log('Connected to Mongodb Server');
})

db.on('error', ()=>{
    console.log('Connection Error');
})

db.on('disconnect', ()=>{
    console.log('disconnected to Mongodb Server');
})