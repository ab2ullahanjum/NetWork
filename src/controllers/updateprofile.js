const UserSchema = require('../models/users');
const bcryptjs = require('bcryptjs');
const fs = require('fs') 

const updateprofile = async (req, res) => {
  try {
    let temp = true
    let user = await UserSchema.findOne({email : req.body.email});
   
    if (req.body.newPassword) {
      let passwordCheck =  await bcryptjs.compare(req.body.currentPassword, user.password);
      temp = passwordCheck;
    }


    if (temp) {
      let updateFields = {};
      if (req.body.newPassword) updateFields.password = req.body.newPassword;
      if (req.body.bio) updateFields.bio = req.body.bio;
      if (req.body.birthdate) updateFields.birthdate = req.body.birthdate;
      if (req.body.phone) updateFields.phone = req.body.phone;
      if (req.body.whatsapp) updateFields.whatsapp = req.body.whatsapp;
      if (req.body.name) updateFields.name = req.body.name;
      if (req.body.package) updateFields.pkg = req.body.package; 
      if (req.body.newPassword) updateFields.password = await bcryptjs.hash(req.body.newPassword,10); 
      if (req.files && req.files['file'] && req.files['file'][0]) {
        updateFields.profile = req.files['file'][0].path;
        if (user.profile !== 'static/uploads/user.png') {
          fs.unlinkSync(user.profile)
        } 
      }
      await UserSchema.updateOne({ email: req.body.email}, { $set: updateFields });

      res.send('done');
    } else {
      res.send('invalid');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = updateprofile;

