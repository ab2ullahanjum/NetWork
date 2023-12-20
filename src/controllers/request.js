const ContactSchema = require('../models/contactform');
const bcryptjs = require('bcryptjs');
const UserSchema = require('../models/users') // Update the path to your UserSchema file
const AdminSchema = require('../models/admindata') 

module.exports = {
    approverequest: async (req, res) => {
        try {
            if (req.user.is_Admin) {
                let date = new Date().toLocaleDateString('en-GB');;
                let password = await bcryptjs.hash("123456", 10);
                let result = new UserSchema({
                  name: req.body.name,
                  password: password,
                  email: req.body.email,
                  profile: 'static/uploads/user.png',
                  is_Admin: false,
                  date: date,
                  tokens: req.body.random,
                  lastmonthusage : 0,
                  totalusage  : 0,
                  wallet : 0,
                  deposit : 0,
                  pending: 0,
                  totalbill : 0,
                  paid : 0
                });
            
               
                await result.save();
                res.send(result);
                await ContactSchema.deleteOne({email : req.body.email})
                let admindata =   await AdminSchema.findOne({find:"find"});
                admindata.conreq = +admindata.conreq - 1;
              await  admindata.save();
            } else {
                res.status(401).send('Invalid Request!')
            }
        } catch (error) {
            console.log(error)
        }
    },
    disapproverequest: async (req, res) => {
        try {
            if (req.user.is_Admin) {
                await ContactSchema.deleteOne({email : req.body.email})
                let admindata =   await AdminSchema.findOne({find:"find"});
                admindata.conreq = +admindata.conreq - 1;
              await  admindata.save();
                res.send('done')
            } else {
                res.status(401).send('Invalid Request!')
            }
        } catch (error) {
            console.log(error)
        }
    }
}