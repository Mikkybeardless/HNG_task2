import Cron from "croner";
import axios from "axios";

const url = "https://hng-task2-285i.onrender.com"; // replace with your server's URL

const startKeepAliveJob = () => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  const job = Cron("*/5 * * * *", () => {
    // Runs every 5 minutes
    axios
      .get(url)
      .then((response) => {
        console.log("Server is up and running, time:", time);
      })
      .catch((error) => {
        console.error("Error keeping server alive:", error.message);
      });
  });
};
export default startKeepAliveJob;
