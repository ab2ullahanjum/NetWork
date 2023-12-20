const UserSchema = require('../models/users')

module.exports = async (req, res) => {
    const query = req.query.q;
  
    try {
        const users = await UserSchema.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
            ],
        }).exec();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }