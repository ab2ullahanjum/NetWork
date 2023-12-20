const bcryptjs = require('bcryptjs');
const UserSchema = require('../models/users') // Update the path to your UserSchema file
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
      let user = await UserSchema.findOne({ email: req.body.email });
      if (!user) {
        // If the user doesn't exist, send 'invalid'
        res.send('invalid');
      } else {
        // If the user exists, compare the passwords
        let passwordMatch = await bcryptjs.compare(req.body.password, user.password);
  
        if (passwordMatch) {
          let token = await jwt.sign({ _id: user._id },"helloiamadullahfrommassandavirkan");
          user.tokens = user.tokens.concat({token:token})
  
          res.cookie('jwt', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true
          });
          res.send('done');
          await user.save()
        } else {
          // If passwords do not match, send 'invalid'
          res.send('invalid');
        }
      }
    } catch (error) {
      // Handle any potential errors (e.g., database error)
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }