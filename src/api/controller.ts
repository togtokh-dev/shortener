import { Request, Response } from "express";
import {
  service_create,
  service_one,
  service_update,
  service_remove,
  service_all,
} from "./service";
import QRCode from "qrcode";
function makeid(length: any): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export const create = async (req: Request, res: Response) => {
  const { url } = req.body;
  try {
    const results: any = await service_create({
      short_url: await makeid(6),
      long_url: url,
    });
    return res.status(200).json({
      success: true,
      message: "Success",
      data: results,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
export const getinfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const results: any = await service_one({ short_url: id });
    return res.status(200).json({
      success: true,
      message: "Success",
      data: results,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
export const getone = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = req.query;
  let query_params = "";
  if (Object.keys(query).length > 0) {
    query_params = "?";
    let index = 0;
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        index++;
        const element = query[key];
        query_params = query_params + `${key}=${element}`;
        if (Object.keys(query).length != index) {
          query_params = query_params + "&";
        }
      }
    }
  }
  const body = req.body;
  try {
    const results: any = await service_one({ short_url: id });
    const new_count = results.view_counter + 1;
    await service_update({ short_url: id }, { view_counter: new_count });
    return res.redirect(results.long_url + query_params);
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
export const getone_sum = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const results: any = await service_one({ short_url: id });
    const new_count = results.view_counter + 1;
    await service_update({ short_url: id }, { view_counter: new_count });
    return res.status(200).json({
      success: true,
      count: new_count,
    });
    return res.redirect(results.long_url);
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
export const qrCreate = async (req: Request, res: Response) => {
  const { data } = req.query;
  try {
    let stringdata = JSON.stringify(data);
    QRCode.toDataURL(stringdata, function (err, code) {
      if (err) return console.log("error occurred");
      const base64Data = code.replace(
        /^data:image\/(png|jpeg|jpg);base64,/,
        ""
      );
      const img = Buffer.from(base64Data, "base64");
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": img.length,
      });
      res.end(img);
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
export const qrCreate_text = async (req: Request, res: Response) => {
  const { data } = req.body;
  try {
    let stringdata = JSON.stringify(data);
    QRCode.toDataURL(stringdata, function (err, code) {
      if (err) return console.log("error occurred");
      res.end(code);
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
