import UserModel from '../models/user';
import { IUser } from '../models/user';

export const createUserService = async (data: Partial<IUser>) => {
  return await UserModel.create(data);
};

export const getUserService = async (id: string) => {
  return await UserModel.findById(id);
};

export const getAllUsersService = async () => {
  return await UserModel.find();
};

export const updateUserService = async (id: string, data: Partial<IUser>) => {
  return await UserModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUserService = async (id: string) => {
  return await UserModel.findByIdAndDelete(id);
};