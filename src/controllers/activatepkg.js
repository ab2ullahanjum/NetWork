const UserSchema = require('../models/users')
const PackageSchema = require('../models/packages')

module.exports = async(req,res)=>{
try {
    let user = req.user;
    let pkg = await PackageSchema.findOne({name : req.body.packageName})
    let dbuser = await UserSchema.findOne({email : user.email});
    let wallet = +dbuser.wallet;
    let pkgprice = +pkg.price;
    if ( wallet < pkgprice) {
        res.send('invalid')
    } else {
        let date = new Date();
        dbuser.wallet = +dbuser.wallet  - req.body.packagePrice;
        dbuser.pkgactivationdate = date;
        dbuser.pkg = req.body.packageName;
        dbuser.totalbill = req.body.packagePrice;
        dbuser.paid =  req.body.packagePrice;
        await dbuser.save();
        res.send('done')
        const adminUsers = await UserSchema.find({ is_Admin: true });

        // For each admin user, update their revenue based on the package price and real price difference
        const promises = adminUsers.map(async (adminUser) => {
            revenue = +pkg.price - +pkg.realprice ;
           adminUser.revenue = +adminUser.revenue + revenue;
            await adminUser.save();
        });
        await Promise.all(promises);
    }
} catch (error) {
    console.log(error)
    res.status(401).send(error)
}
}
