import errorHandler from "errorhandler";
import app from "./app";
import https from "https";
import fs from "fs";
import http from "http";
/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

let server;
if (process.env.NODE_ENV === "production") {
  server = http.createServer(app);
  // server = https.createServer(
  //   {
  //     key: fs.readFileSync("/etc/ssl/certs/negj/negj-web.toki.mn.key"),
  //     cert: fs.readFileSync("/etc/ssl/certs/negj/negj-web.toki.mn.pem"),
  //   },
  //   app
  // );
} else {
  server = http.createServer(app);
}

/**
 * Start Express server
 */
server.listen(app.get("port"), async () => {
  console.log(
    "App id running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("Press CTRL-C to stop\n");
});

export default server;
