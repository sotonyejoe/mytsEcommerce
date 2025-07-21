import { Request, Response } from 'express';
import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from '../services/categoryService';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await createCategoryService(req.body);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await getAllCategoriesService();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await getCategoryByIdService(id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updatedCategory = await updateCategoryService(req.params.id, req.body);
    res.status(200).json(updatedCategory);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deletedCategory = await deleteCategoryService(req.params.id);
    res.status(200).json(deletedCategory);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
