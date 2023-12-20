const mongoose = require('mongoose');
let DepositSchema = new mongoose.Schema({
    username:{
    type:String
   },
    useremail:{
    type:String
   },
    methodName:{
    type:String
   },
   accountNumber:{
    type:String
   },
   accountHolder:{
    type:String
   },
   depositAmount:{
    type:String
   },
   imageUpload:{
    type:String
   },
   trxId:{
      type:String
   }
})

module.exports = mongoose.model('depositrequests', DepositSchema);