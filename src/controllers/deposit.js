const DepositSchema = require('../models/deposit');
const DepositrequestsSchema = require('../models/depositrequests');
const UserSchema = require('../models/users')
const AdminSchema = require('../models/admindata') 

const fs = require('fs') 

module.exports = {
    adddepositmethod: async (req, res) => {
        try {
            if(req.user.is_Admin){
                 let result = await DepositSchema.create({
                    name: req.body.methodName,
                    account : req.body.methodAccountNumber,
                    accountholder: req.body.methodAccountHolder,
                    recommended : req.body.recommended,
                    pic : req.files['file'][0].path
                    })
                    if (result) {
                        res.send('done');
                    } else {
                        res.status(401).send('Invalit Request!')
                    }
                 
            }else{
                res.status(401).send('Invalit Request!')
            }
     } catch (error) {
            console.error(error)
        }
    },
    updatedepositmethod: async (req, res) => {
        try {
            if (req.user.is_Admin) {
                const depositMethod = await DepositSchema.findOne({ name: req.body.findmethod});
    
                if (!depositMethod) {
                    return res.status(404).send('Deposit method not found.');
                }
                let pic = depositMethod.pic;
                if (req.files && req.files['file'] && req.files['file'][0]) {
                    depositMethod.name = req.body.name;
                    depositMethod.account = req.body.accountNumber;
                    depositMethod.accountholder = req.body.accountHolderName;
                    depositMethod.recommended = req.body.recommended;
                    depositMethod.pic = req.files['file'][0].path;
    
                    await depositMethod.save();
    
                    res.status(200).send('done');
                    fs.unlinkSync(pic)
                } else {
                    res.status(400).send('File not provided or invalid.');
                }
            } else {
                res.status(403).send('Permission denied.');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error.');
        }
    },
    deletedepositmethod : async(req,res)=>{
        try {
            if (req.user.is_Admin) {
                let method  =  await DepositSchema.findOne({name : req.body.name});
                let result = await DepositSchema.deleteOne({name : req.body.name});
                if (result.acknowledged) {
                    res.send('done')
                } else {
                    res.send('Something went Wrong!')
                }
                fs.unlinkSync(method.pic)
            } else {
                res.status(401).send('Something went Wrong!')
            }
        } catch (error) {
            console.log(error)
        }
    },
    depositrequest : async(req,res)=>{
        try {
            let user = req.user;
            let dbuser = await UserSchema.findOne({email : user.email})
            dbuser.pending =  +dbuser.pending + +req.body.depositAmount;
            await  dbuser.save();
            let result = await DepositrequestsSchema.create({
                username: req.user.name,
                useremail : req.user.email,
                methodName: req.body.methodName,
                accountNumber: req.body.accountNumber,
                accountHolder: req.body.accountHolder,
                depositAmount: req.body.depositAmount,
                imageUpload: req.files['file'][0].path,
                trxId: req.body.trxId
            })
            if(result){
                res.send('done')
                let admindata =   await AdminSchema.findOne({find:"find"});
                admindata.depreq = +admindata.depreq + +req.body.depositAmount;
                admindata.pendingdepreq = +admindata.pendingdepreq + 1;
              await  admindata.save()
            }else{
                res.status(402).send('Something went Wrong ' + error)
            }
           
        } catch (error) {
            res.status(402).send('Something went Wrong ' + error)
            console.log(error)
        }
    },
    acceptreq : async(req,res)=>{
        try {
            if (req.user.is_Admin) {
               let user = await UserSchema.findOne({email : req.body.useremail})
               user.wallet  = +user.wallet + req.body.depositamount;
               user.deposit = +user.deposit + req.body.depositamount;
               user.pending = +user.pending - +req.body.depositamount;;
               await user.save();
               await DepositrequestsSchema.deleteOne({
                useremail : req.body.useremail,
                depositAmount :req.body.depositamount
               })
               res.send('done');
               let admindata =   await AdminSchema.findOne({find:"find"});
               admindata.totaldep = +admindata.totaldep + +req.body.depositamount;
               admindata.depreq = +admindata.depreq  - +req.body.depositamount;
               admindata.pendingdepreq = +admindata.pendingdepreq - 1;
               admindata.accepteddepreq = +admindata.accepteddepreq + 1;

             await  admindata.save()
            } else {
                res.status(401).send('Something went Wrong!')
            }
        } catch (error) {
            console.log(error)
        }
    },
    rejectreq: async (req, res) => {
        try {
            if (req.user.is_Admin) {
                await DepositrequestsSchema.deleteOne({
                    useremail: req.body.useremail,
                    depositAmount: req.body.depositamount
                });
                let admindata = await AdminSchema.findOne({ find: "find" });
                admindata.depreq = +admindata.depreq;
                admindata.pendingdepreq = +admindata.pendingdepreq;
                admindata.depreq -= +req.body.depositamount;
                admindata.pendingdepreq--;
                await admindata.save();

                res.send('done');
            } else {
                res.status(403).json({ error: 'Permission Denied' });
            }
        } catch (error) {
            console.error('Error rejecting deposit request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    }
