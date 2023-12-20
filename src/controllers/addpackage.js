const PackageSchema = require('../models/packages')
module.exports = async (req,res)=>{
    try {
        let user = req.user;
        if(user.is_Admin){
            let result = await PackageSchema.create({
                name: req.body.packageName,
                speed: req.body.packageSpeed,
                price: req.body.packagePrice,
                description: req.body.packageDescription,
                recommended: req.body.recommended,
                realprice : req.body.realprice
            });
            if(result){
                res.send('done')
            }else{
                res.send('Something went wrong!')
            }
        }else{
            res.status(401).send('Something went Wrong!')
        }
    } catch (error) {
        console.log(error)
    }
}