const mongoose = require('mongoose');
let DepositSchema = new mongoose.Schema({
   pic:{
    type:String
   },
   name:{
    type:String
   },
   account:{
    type:String
   },
   accountholder:{
    type:String
   },
   recommended:{
      type:Boolean
   }
})

module.exports = mongoose.model('deposit', DepositSchema);