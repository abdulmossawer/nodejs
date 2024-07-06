const { trim } = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = require('../routes/personRoutes');
const { jwtAuthMiddleware } = require('../jwt');

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
    },

    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50
      },

    password: {
        type: String,
        required: true,
        minlength: 6
      }
});

// For password authentication
personSchema.pre('save', async function(next){
    const person = this;

    // Hast the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();

    try { 
        // Hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //override the plain password with hash
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(err);
    }
})



personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        // Use bcrypt to compare provided password to hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    } catch (error) {
        throw error;
    }
}

// Create person model

const Person = mongoose.model('Person', personSchema);
module.exports = Person;