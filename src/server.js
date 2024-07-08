import app from "./app.js";
import dotenv from "dotenv";
import startKeepAliveJob from "./services/service.awakeApi.js";
dotenv.config();

const port = process.env.PORT || 3000;
startKeepAliveJob();
app.listen(port, () =>
  console.log(`Server is listening on port http://localhost:${port}`)
);
