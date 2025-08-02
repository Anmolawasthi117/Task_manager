// server/index.js
import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

async function prepareApp() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app;
}

export default async function handler(req, res) {
  const preparedApp = await prepareApp();
  return preparedApp(req, res); // Pass to Express
}
