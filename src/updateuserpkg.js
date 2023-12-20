const UserSchema = require('./models/users');

module.exports = async function updateUsersPackage() {
  try {
    // Calculate the date one month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Fetch users whose pkgactivationdate is one month old
    const usersToUpdate = await UserSchema.find();

    // Update the pkg field for each user to "expired"
    const updatePromises = usersToUpdate.map(async (user) => {
      // Convert string date to Date object
      const activationDate = new Date(user.pkgactivationdate);

      if (activationDate <= oneMonthAgo) {
        await UserSchema.updateMany({ _id: user._id }, { $set: { pkg: 'expired' } });
      }
    });

    await Promise.all(updatePromises);

  } catch (error) {
    console.error('Error updating users:', error);
  }
};
