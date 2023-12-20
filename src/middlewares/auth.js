const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserSchema = require('../models/users')
const PackageSchema = require('../models/packages')
const FrontendSchema = require('../models/frontend')

module.exports = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      const authentication = jwt.verify(token, 'helloiamadullahfrommassandavirkan');
      let user = await UserSchema.findOne({_id:authentication._id})
      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      let packages =await PackageSchema.find({})
      let f = await FrontendSchema.findOne({ find: 'find' });
      res.status(401).render('index', { f , packages})
    }
  }