import express from "express";
import dotenv from "dotenv";

// route import
import authRoute from "./routes/auth.route.js";

const app = express();
dotenv.config();

app.use(express.json());

// Routes
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Hello, welcome to the home route",
  });
});

// catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.render("404");
});

export default app;
