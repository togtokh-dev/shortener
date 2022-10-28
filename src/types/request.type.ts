import { Request } from "express";

export interface TokiRequest extends Request {
  user: {
    _id: string;
    profilePicURL: string;
    phoneNo: string;
    countryCode: string;
    name: string;
    sessionId: string;
  };
}
