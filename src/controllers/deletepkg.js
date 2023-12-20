const PackageSchema = require('../models/packages')


module.exports = async (req,res)=>{
    try {
        if (req.user.is_Admin) {
            let result = await PackageSchema.deleteOne({name : req.body.name});
            if (result) {
                res.send('done')
            } else {
                res.send('Something went Wrong!')
            }
        } else {
            res.status(401).send('Something went Wrong!')
        }
    } catch (error) {
        console.log(error)
    }
}