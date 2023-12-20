const UserSchema = require('./models/users')


module.exports = async function updateRevenueOnTenthDay() {
    try {
        // Connect to your MongoDB database

        // Get users with is_Admin set to true
        const adminUsers = await UserSchema.find({ is_Admin: true });

        // Update revenue for each admin user
        const promises = adminUsers.map(async (adminUser) => {
            // Check if the current date is the 10th day of the month
            const currentDate = new Date();
            if (currentDate.getDate() === 10) {
                // Update the revenue to zero
                adminUser.revenue = 0;
                await adminUser.save();
            }
        });

        // Wait for all updates to complete
        await Promise.all(promises);

    } catch (error) {
        console.error('Error updating revenue:', error);
    }
}
