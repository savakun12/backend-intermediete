import app from "./app";
import { syncDatabase } from "./utils/syncDatabase";

const APP_PORT = process.env.APP_PORT || 3000;

const startSerer = async () => {
  await syncDatabase();

  app.listen(APP_PORT, () => {
    console.log("Server is running on port" + APP_PORT);
  });
};

startSerer();
