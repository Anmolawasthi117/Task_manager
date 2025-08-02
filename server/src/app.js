import express from 'express';
import cors from 'cors';
import logger from "./utils/logger.js";
import morgan from "morgan";



const app = express();
const morganFormat = ":method :url :status :response-time ms";

// Common Middleware
app.use(express.json({limit:"16kb"})); //for parsing the json
app.use(express.urlencoded({extended:true,limit:"16kb"})); // for ulrencoding
app.use(cookieParser()); 
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.static("public")) // for serving any assets
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  ); // for logger

// Basic route
app.get('/', (req, res) => {
  res.send('Hello Server');
  logger.info("Hello Server");
});

// importing routes
import healthcheackRouter from "./routes/healthcheack.routes.js";
import taskRouter from "./routes/task.routes.js";
import cookieParser from 'cookie-parser';


// creating routes
app.use("/api/v1/healthcheack", healthcheackRouter);
app.use("/api/v1/tasks", taskRouter);


export {app};