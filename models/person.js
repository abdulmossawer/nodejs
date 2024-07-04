const { trim } = require('lodash');
const mongoose = require('mongoose');

// Define the person scheemas

const personSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    salary: {
        type: Number,
        required: true
    },

    work: {
        type: String,
        required: true,
        enum: ['chef', 'waiter', 'manager', 'delivery']
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    address: {
        type: String,
        required: true
    }
});

// Create person model

const Person = mongoose.model('Person', personSchema);
module.exports = Person;