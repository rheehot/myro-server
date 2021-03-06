import { Contents } from "../entity";
import { getRepository } from "typeorm";

export const find = async () => {
  return await Contents.find();
};

export const findOne = async (id) => {
  return await Contents.findOne({id});
};

export const create = async (contents: Contents) => {
  const data = Contents.create(contents);
  return await Contents.save(data);
};
