const mongoose = require('mongoose')
require('dotenv').config();

// Define the mongoDb connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL // Replace my database name with your database name
const mongoURL = process.env.MONGODB_URL;

// Setup MongoDb connection
// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

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