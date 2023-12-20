const ContactSchema = require('../models/contactform')
const AdminSchema = require('../models/admindata') 
module.exports = async (req, res) => {

    try {
      await ContactSchema.create({
        name: req.body.name,
        phone: req.body.phone,
        pkg: req.body.pkg,
        email: req.body.email,
        msg: req.body.msg
      })
    let admindata =   await AdminSchema.findOne({find:"find"});
    admindata.conreq = +admindata.conreq + 1;
  await  admindata.save();
      res.send("done")
    } catch (error) {
      console.log(error);
    }
  
  }