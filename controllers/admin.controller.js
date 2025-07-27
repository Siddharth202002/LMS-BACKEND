import User from "../models/userModel.js";

const getUserStats = async (req, res, next) => {
  try {
    // Get the total number of documents in the User collection
    const totalUsers = await User.countDocuments();

    // Get the number of users who have an active subscription.
    // This query assumes you have a 'subscription' object in your User schema
    // with a 'status' field that is set to 'active' for subscribed users.
    // Please adjust the query to match your actual User schema.
    const subscribedUsers = await User.countDocuments({
      "subscription.status": "Active",
    });

    // Send the response with the fetched statistics
    res.status(200).json({
      success: true,
      message: "User statistics retrieved successfully",
      stats: {
        totalUsers,
        subscribedUsers,
      },
    });
  } catch (error) {
    // Handle any errors that occur during the process
    return next(new AppError(error.message, 500));
  }
};

export { getUserStats };
