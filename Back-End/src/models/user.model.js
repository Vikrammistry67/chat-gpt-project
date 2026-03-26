const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        // unique: true // KEEP THIS
    },
    password: {
        type: String,
        required: true,
        // unique: true <--- REMOVE THIS
    },
    fullName: {
        firstName: {
            type: String,
            required: true,
            // unique: true <--- REMOVE THIS
        },
        lastName: {
            type: String,
            required: true,
        },
    },
}, { timestamps: true });


module.exports = mongoose.model('user', userSchema);