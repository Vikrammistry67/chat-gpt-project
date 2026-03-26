const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('mongodb connected !')
    } catch (err) {
        console.log('ERROR at database connection !', err)
    };
};

module.exports = connectToDB;