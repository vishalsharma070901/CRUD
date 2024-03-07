const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/DB");
const userRouter = require("./routes/UserRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server is running at 8000");
});
