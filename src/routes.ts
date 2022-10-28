import { Request, Response, Router } from "express";
import apiRouter from "./api/router";
// Routes
const routers = Router();
//

//
routers.use("/shortener/api/v1", apiRouter);
routers.use("/", apiRouter);
// Router not found
routers.all("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "404",
  });
});

export default routers;
