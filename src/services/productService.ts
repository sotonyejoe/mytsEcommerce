import { ProductModel } from '../models/product';

export const createProductService = async (data: any) => {
  return await ProductModel.create(data);
};

export const getAllProductsService = async () => {
  return await ProductModel.find();
};

export const getProductByIdService = async (id: string) => {
  return await ProductModel.findById(id);
};

export const updateProductService = async (id: string, data: any) => {
  return await ProductModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProductService = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};
