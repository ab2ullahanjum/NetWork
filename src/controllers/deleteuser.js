const UserSchema = require('../models/users');

module.exports = async (req,res)=>{
    try {
        let result = await UserSchema.deleteOne({email: req.body.email});
        if (result) {
            res.send('done')
        } else {
            res.send('Something went Wrong!')
        }
      
    } catch (error) {
        res.status(401).send(error)
    }
    
}