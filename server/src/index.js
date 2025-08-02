// src/index.js
import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

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
  return preparedApp(req, res);
}
