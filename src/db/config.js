const async = require('hbs/lib/async');
const mongoose = require('mongoose');

async function mongoDB() {
    try {
        await mongoose.connect("mongodb+srv://abdullahkamboh709:root@cluster0.4kpya3r.mongodb.net/netweb")
    } catch (error) {
        console.log(error)
    }
    
}
  

module.exports = mongoDB;