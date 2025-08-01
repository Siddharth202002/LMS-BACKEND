import app from "../app.js";
import Razorpay from "razorpay";
import cloudinary from "cloudinary";
import connection from "../config/config.js";
import serverless from "serverless-http";

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

// DB connection (ensure it's not reconnecting on every invocation)
let isConnected = false;
const connectOnce = async () => {
  if (!isConnected) {
    await connection();
    isConnected = true;
    console.log("Connected to DB");
  }
};

await connectOnce();

// Export serverless handler
export const handler = serverless(app);
