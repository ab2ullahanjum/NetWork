const bcryptjs = require('bcryptjs');
const UserSchema = require('../models/users') // Update the path to your UserSchema file
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
      let date = new Date().toLocaleDateString('en-GB');
      let password = await bcryptjs.hash(req.body.password, 10);
      let result = new UserSchema({
        name: req.body.name,
        password: password,
        email: req.body.email,
        profile: req.files['file'][0].path,
        is_Admin: false,
        date: date,
        pkg: "none",
        tokens: req.body.random,
        remainingbill : 0,
        lastmonthusage : 0,
        totalusage  : 0,
        wallet : 0,
        deposit : 0,
        pending: 0,
        totalbill : 0,
        paid : 0
      });
  
      // Generate and save the token
      let token = await jwt.sign({ _id: result._id }, process.env.SECRET_KEY);
      result.tokens = result.tokens.concat({token:token})
      res.cookie('jwt', token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true
      })
      // Save the user with the updated token
      await result.save();
      res.send('done');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };