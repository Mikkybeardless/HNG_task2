import express from "express";
import dotenv from "dotenv";

// route import
import authRoute from "./routes/auth.route.js";
import orgRoute from "./routes/org.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
dotenv.config();

app.use(express.json());

// Routes
app.use("/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/organisations", orgRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Hello, welcome to the home route",
  });
});

// catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.json("Page not found");
});

export default app;
