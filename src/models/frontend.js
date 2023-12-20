const mongoose = require('mongoose');
let FrontendSchema = new mongoose.Schema({
    find:
    { type: String },
    sitename:
        { type: String },
    sitedescription:
        { type: String },
   whatwedo:
        { type: String },
    whoweare:
        { type: String },
    phone:
        { type: String },
    email:
        { type: String },
    address:
        { type: String },
    information:
        { type: String },
    notice:
        { type: String },
    logo:
        { type: String },
    favicon:
        { type: String },
    links : {
        youtube:String, // Array of strings
        facebook:String,
        linkedin:String,
        twitter:String,
        github:String,
        instagram:String
      },
})

module.exports = mongoose.model('frontend', FrontendSchema);