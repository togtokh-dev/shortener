import short_model from "../models/shorts";

export const service_all = async (body: any, sort: any) => {
  try {
    const res_find = await short_model.find(body).sort(sort);
    return Promise.resolve(res_find);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_one = async (body: any) => {
  try {
    const res_find = await short_model.findOne(body);
    return Promise.resolve(res_find);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_create = async (body: any) => {
  try {
    const res_find = await short_model.create(body);
    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_remove = async (find: any) => {
  try {
    // const res_find = await car_model.findOneAndDelete(id);
    const res_find = await short_model.updateOne(find, {
      $set: { delFlg: true },
    });
    return Promise.resolve(res_find);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_update = async (find: any, body: any) => {
  try {
    const res_find = await short_model.updateOne(
      { ...find },
      { $set: { ...body } }
    );
    return Promise.resolve(res_find);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
