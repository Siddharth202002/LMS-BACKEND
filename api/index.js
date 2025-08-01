import app from "../app.js";
import Razorpay from "razorpay";
import cloudinary from "cloudinary";
import connection from "../config/config.js";

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Razorpay config
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// DB connection - Your logic here is good! It prevents reconnecting on every request.
let isConnected = false;
const connectOnce = async () => {
  if (!isConnected) {
    await connection();
    isConnected = true;
    // You can remove the console.log for production if you want
    console.log("Connected to mongoDB atlas");
  }
};

// Establish connection before handling requests
await connectOnce();

// ✅ Export the Express app as the default export
export default app;
