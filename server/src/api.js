
import { createServer } from "@vercel/node";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return app(req, res); // forward to express
}

export default createServer(handler);
