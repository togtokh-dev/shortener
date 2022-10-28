import mongoose from "mongoose";
import { Types } from "mongoose";
export interface itemsDoc extends mongoose.Document {
  id: string;
  short_url: string;
  long_url: string;
  view_counter: number;
}

const Schema = new mongoose.Schema<itemsDoc>(
  {
    short_url: String,
    long_url: String,
    view_counter: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const items = mongoose.model<itemsDoc>("shorts", Schema);
export default items;
