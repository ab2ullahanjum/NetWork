require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const connectDB = require('../db/config');
const path = require('path');
const async = require('hbs/lib/async');
const bcrypt = require('bcrypt')
const FrontendSchema = require('../models/frontend')
const ContactSchema = require('../models/contactform')
const UserSchema = require('../models/users')
connectDB();
const routes = express.Router();
const fs = require('fs').promises;
routes.use(express.urlencoded({ limit: '10mb', extended: true }));
routes.use(express.json({ limit: '10mb' }));
const viewsFolderPath = path.join(__dirname, '..', '..', 'views');
const multer = require('multer')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
routes.use(cookieParser());
const users = express.Router();
// controllers imports
const updatesite = require('../controllers/updatesite')
const contact = require('../controllers/contact')
const auth = require('../middlewares/auth')
const register = require('../controllers/register')
const PackageSchema = require('../models/packages')
const DepositSchema = require('../models/deposit')
const DepositrequestsSchema = require('../models/depositrequests')
const AdminSchema = require('../models/admindata') 
const ProblemSchema = require('../models/problems')
const hbshelper = require('../hbshelper')
hbshelper();


const updateUsersPackage = require('../updateuserpkg')
updateUsersPackage();

const updateRevenueOnTenthDay = require('../updaterevenue');
updateRevenueOnTenthDay();
//render data
async function renderdata() {
  let sitedetails = await FrontendSchema.findOne({ find: 'find' });
  return sitedetails;
}

//static routes

routes.get('/', async (req, res) => {
  let f = await renderdata();
  let packages =await PackageSchema.find({})
  res.render('index', { f , packages})
})

routes.get('/contact', (req, res) => {
  res.render('contact')
})

routes.get('/signup', async (req, res) => {
  let f = await renderdata();
  res.render('signup', { f })
})
routes.get('/login', async (req, res) => {
  let f = await renderdata();
  res.render('login', { f })
})



const upload = require('../middlewares/multer');



var updatesiteUpload = upload.fields([{ name: 'logo' }, { name: 'favicon' }])
//update site
routes.post('/updatesite', updatesiteUpload, updatesite);

//Contact
routes.post('/contact', contact)




//authentication pages

routes.use(['/dashboard', '/settings', '/requests', '/signout', '/users'], auth);

//check email
routes.post('/checkemail', async (req, res) => {
  try {
      const { email } = req.body;
      const user = await UserSchema.findOne({ email });
      res.json({ exists: !!user });
  } catch (error) {
      console.error('Error checking email existence:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


//register user
var registerUpload = upload.fields([{ name: 'file' }])
routes.post('/register', registerUpload, register);


//login user
const login = require('../controllers/login')
routes.post('/login', login);


//signout user
const signout = require('../controllers/signout')
routes.delete('/signout', auth, signout);


//admin delete user
const deleteuser = require('../controllers/deleteuser')
routes.delete('/deleteuser',deleteuser)


//protected routes


routes.get('/dashboard', auth, async (req, res) => {
  if (req.user.is_Admin) {
    let admin = req.user;
    let user = await UserSchema.find({});
    let pkgs = await PackageSchema.find({});
    let admindata = await AdminSchema.findOne({find:"find"});
    let data = await renderdata();
    res.render('admindashboard', { data, admin, user , admindata , pkgs})
  } else {
    let user = req.user
    let data = await renderdata();
    res.render('dashboard', { user, data })
  }
})

routes.get('/settings', auth, async (req, res) => {
  if (req.user.is_Admin) {
    let data = await renderdata();
    res.render('settings', { data })
  } else {
    res.status(401).send("Admin Login Required")
  }

})

routes.get('/requests', auth, async (req, res) => {
  if (req.user.is_Admin) {
    let requests = await ContactSchema.find({});
    res.render('request', { requests })
  } else {
    res.render('index')
  }

})

routes.get('/users', auth, async (req, res) => {
  if (req.user.is_Admin) {
    let user = await UserSchema.find({});
    let data = await renderdata();
    res.render('users', { user, data });
  } else {
    res.render('index')
  }
})

routes.get('/profile', auth, async (req, res) => {
  if (req.user.is_Admin) {
    let user = req.user;
    let data = await renderdata();;
    res.render('profile', { user, data ,is_Admin : true})
  } else {
    let user = req.user;
    let data = await renderdata();;
    res.render('profile', { user, data ,is_Admin : false})
  }
})

users.get('/:email' , auth, async(req,res) =>{
  if (req.user.is_Admin) {
    let host = `${req.protocol}://${req.get('host')}`
    let user = await UserSchema.findOne({email: req.params.email})
    let data = await renderdata();
    res.render('profile', { user, data , is_Admin : true,host})
  } else {
    let user = req.user;
    let data = await renderdata();;
    res.render('profile', { user, data , is_Admin : false})
  }
})

routes.get('/packages',auth, async(req,res)=>{
  if (req.user.is_Admin) {
    let data = await renderdata();
    let packages = await PackageSchema.find({});

    res.render('packages', {  data , is_Admin : true , packages})
  } else {
    let user = req.user;
    let data = await renderdata();
    let packages = await PackageSchema.find({});
    res.render('packages', {data , is_Admin : false,packages, user})
  }
})





//profileupdate routes
const updateprofile = require('../controllers/updateprofile')
routes.put('/updateprofile',  [auth, registerUpload], updateprofile)


const updateuserstatus = require('../controllers/updateuserstatus')

routes.put('/updateuserstatus', auth , updateuserstatus)


// addpackage

const addpackage = require('../controllers/addpackage')
routes.put('/addpackage',auth,addpackage)


//  updatepkg
const updatepkg = require('../controllers/updatepkg')
routes.put('/updatepkg',auth,updatepkg)

//delete pkg 
const deletepkg = require('../controllers/deletepkg')
routes.delete('/deletepkg',auth,deletepkg)


//activate pkg
const activatepkg = require('../controllers/activatepkg')
routes.put('/activatepkg',auth,activatepkg)

//request actions

const request = require('../controllers/request')

routes.put('/approverequest',auth,request.approverequest)
routes.delete('/disapproverequest',auth,request.disapproverequest)



//opendash

routes.put('/opendash',auth,async(req,res)=>{
  try {
    if (req.user) {
      res.send('done');
    } else {
      res.send('invalid')
    }
  } catch (error) {
    console.log(error)
  }
})


routes.get('/depositmethods',auth,async(req,res)=>{
  if (req.user.is_Admin) {
    const fdata = await renderdata();
    let methods  = await DepositSchema.find({});
    let data = {fdata , is_Admin : true , user : req.user, methods}
    res.render('depositmethods', {data});
  } else {
    const fdata = await renderdata();
    let methods  = await DepositSchema.find({});
    let data = {fdata , is_Admin : false , user : req.user, methods}
    res.render('depositmethods', {data});
  }

})
//deposit routes
routes.get('/depositrequests',auth, async(req,res)=>{
  if (req.user.is_Admin) {
    let fdata = await renderdata();
    let depositrequests = await DepositrequestsSchema.find({});
    let data = {
      fdata , is_Admin : true , depositrequests
    }
    res.render('depositrequests.hbs', { data })
  } else {
    let fdata = await renderdata();
    let depositrequests = await DepositrequestsSchema.find({useremail : req.user.email});
    let data = {
      fdata , depositrequests
    }
   res.render('userdepositrequests',{data})
  }
})





const deposit = require('../controllers/deposit')
routes.post('/adddepositmethod', [auth, registerUpload], deposit.adddepositmethod)
routes.put('/updatedepositmethod',[auth, registerUpload], deposit.updatedepositmethod)
routes.delete('/deletedepositmethod' ,auth, deposit.deletedepositmethod)
routes.post('/depositrequest',[auth, registerUpload],deposit.depositrequest)
routes.put('/acceptreq' ,auth, deposit.acceptreq)
routes.delete('/rejectreq' ,auth, deposit.rejectreq)


//search Api
const search = require('../controllers/searchuser')
routes.get('/search', search );




routes.get('/problems',auth, async(req,res)=>{
  if (req.user.is_Admin) {
    let fdata = await renderdata();
    let problems = await ProblemSchema.find({});
    let data = {
      fdata , is_Admin : true , problems
    }
    res.render('problem', { data })
  } else {
    let fdata = await renderdata();
    let user = req.user;
    let data = {
      fdata ,user , is_Admin : false
    }
   res.render('problem',{data})
  }
})


const problem = require('../controllers/problem')
routes.post('/reportproblem',auth,problem.reportproblem)
routes.delete('/deleteproblem',auth,problem.deleteproblem)



//exporting
module.exports = {
  routes: routes,
  users : users
}