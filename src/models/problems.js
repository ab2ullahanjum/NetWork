const mongoose = require('mongoose');
let ProblemSchema = new mongoose.Schema({
   title:{
    type:String
   },
   description:{
    type:String
   },
   pic:{
    type:String
   },
   email:{
    type:String
   },
   name:{
    type:String
   },
})

module.exports = mongoose.model('problems', ProblemSchema);