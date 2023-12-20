const async = require('hbs/lib/async');
const mongoose = require('mongoose');

async function mongoDB() {
    try {
        await mongoose.connect(process.env.CONFIG)
    } catch (error) {
        console.log(error)
    }
    
}
  

module.exports = mongoDB;