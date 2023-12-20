const ProblemSchema = require('../models/problems');
const AdminSchema = require('../models/admindata') 

module.exports = {
    reportproblem: async (req, res) => {
        try {
            const { title, description } = req.body;
            const { profile, email, name } = req.user;

            const result = await ProblemSchema.create({
                title,
                description,
                pic: profile,
                email,
                name
            });

            res.send('done');
            let admindata =   await AdminSchema.findOne({find:"find"});
            admindata.problems = +admindata.problems + 1;

            await  admindata.save()
        } catch (error) {
            console.error('Error reporting problem:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    deleteproblem: async (req, res) => {
        try {
            const { email, title } = req.body;
            await ProblemSchema.deleteOne({ email, title });
            res.json({ message: 'Request deleted successfully!' });

            let admindata =   await AdminSchema.findOne({find:"find"});
            admindata.problems = +admindata.problems - 1;

            await  admindata.save()
        } catch (error) {
            console.error('Error deleting problem:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
