import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRouter from "./routes/user.router.js";
import courseRouter from "./routes/course.router.js";
import paymentRouter from "./routes/payment.route.js";
import errorMiddleware from "./middleWare/error.middleware.js";
import adminRouter from "./routes/admin.router.js";
import { log } from "console";

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/ping", (req, res) => {
  res.status(200).send("pong");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/admin/stats/users", adminRouter);

app.all("*", (req, res) => {
  res.status(404).send("Page Not found");
});
app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  console.log("server connected ");
});
export default app;
