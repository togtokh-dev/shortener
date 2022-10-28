import express, { Express, Request, Response } from "express";
import routers from "./routes";
import connectDB from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import bodyParser from "body-parser";
import lusca from "lusca";
import path from "path";
import compression from "compression";
import logger from "./util/req-logger";
import date from "date-and-time";
import morgan from "morgan";
import fs from "fs";
import { createStream } from "rotating-file-stream";
const jsonParser = bodyParser.json();
const app: Express = express();
const pad = (num: any) => (num > 9 ? "" : "0") + num;
const generator = (time: any) => {
  if (!time) return "file.log";

  const month = time.getFullYear() + "" + pad(time.getMonth() + 1);
  const dir = path.join(`${path.join(__dirname, "../")}`, "log") + `/${month}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return `${month}/file.log`;
};
connectDB();
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
const accessLogStream = createStream(generator(new Date()), {
  path: path.join(path.join(__dirname, "../"), "log"),
});

app.use(
  morgan(
    function (tokens: any, req: any, res: any) {
      return [
        date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    },
    { stream: accessLogStream }
  )
);
app.use(
  cookieParser(),
  fileupload(),
  jsonParser,
  compression(),
  lusca.xframe("SAMEORIGIN"),
  lusca.xssProtection(true),
  cors({
    origin: process.env.APP_URL || "*",
    allowedHeaders: "Set-Cookie, Content-Type, Authorization",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  }),
  function (req, res, next) {
    next();
    express.json();
  }
);
app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/log", express.static(path.join(__dirname, "../log")));

app.use(routers);
app.set("port", process.env.PORT || 3000);
export default app;
