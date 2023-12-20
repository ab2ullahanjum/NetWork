const UserSchema = require('../models/users')

module.exports = async (req, res) => {
    const email = req.body.email;
    const user = req.user;
    if (user.is_Admin) {
        try {
            // Find the user by email
            const user = await UserSchema.findOne({ email : email});
    
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            // Update only the fields that are filled by the user
            if (req.body.lastmonthusage) user.lastmonthusage = req.body.lastmonthusage;
            if (req.body.totalusage) user.totalusage = req.body.totalusage;
            if (req.body.wallet) user.wallet = req.body.wallet;
            if (req.body.deposit) user.deposit = req.body.deposit;
            if (req.body.pending) user.pending = req.body.pending;
            if (req.body.totalbill) user.totalbill = req.body.totalbill;
            if (req.body.paid) {
                user.paid = req.body.paid;
                user.remainingbill = user.totalbill - req.body.paid;
            }
    
            // Save the updated user
            await user.save();
    
            res.status(200).send('done');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(404).send('Admin Permission Required')
    }
   
};