const mongoose = require('mongoose');
let AdminSchema = new mongoose.Schema({
   find:{
    type:String
   },
   totaldeposit:{
    type:String
   },
   conreq:{
    type:String
   },
   totaldep:{
    type:String
   },
   depreq:{
    type:String
   },
   pendingdepreq:{
      type:String
   },
   accepteddepreq:{
      type:String
   },
   problems:{
      type:String
   },
})

module.exports = mongoose.model('admindata', AdminSchema);