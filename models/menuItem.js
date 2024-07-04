const mongoose = require('mongoose')

const MenuItemSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    is_drink: {
        type: Boolean,
        default: false
    },

    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true
    },

    ingredients: {
        type: [String],
        default: []
    },

    num_sales: {
        type: Number,
        default: 0
    }

})

//create menu model
const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
module.exports = MenuItem;