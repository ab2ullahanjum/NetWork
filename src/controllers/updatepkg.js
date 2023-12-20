const PackageSchema = require('../models/packages');

module.exports = async (req,res)=>{
    try {
        let result = await PackageSchema.updateOne({name:req.body.findmethod},{
            $set: req.body
        })
        if(result){
            res.send('done')
        }else{
            res.status(401).send('Something went Wrong!')
        }
    } catch (error) {
        console.error(error)
    }
}