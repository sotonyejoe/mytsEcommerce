import Category from '../models/category';
import mongoose from 'mongoose';

interface CreateCategoryDTO {
  name: string;
  description?: string;
  parentCategory?: string;
}

interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  parentCategory?: string;
}

// Create a new category
export const createCategoryService = async (data: CreateCategoryDTO) => {
  const category = new Category({
    name: data.name,
    description: data.description,
    parentCategory: data.parentCategory ? new mongoose.Types.ObjectId(data.parentCategory) : null,
  });

  return await category.save();
};

// Get all categories
export const getAllCategoriesService = async () => {
  return await Category.find().populate('parentCategory', 'name');
};

// Get category by ID
export const getCategoryByIdService = async (id: string) => {
  return await Category.findById(id).populate('parentCategory', 'name');
};

// Update category
export const updateCategoryService = async (id: string, data: UpdateCategoryDTO) => {
  const category = await Category.findById(id);
  if (!category) throw new Error('Category not found');

  if (data.name) category.name = data.name;
  if (data.description !== undefined) category.description = data.description;
  if (data.parentCategory !== undefined) {
    category.parentCategory = data.parentCategory
      ? new mongoose.Types.ObjectId(data.parentCategory)
      : undefined;
  }

  return await category.save();
};


// Delete category
export const deleteCategoryService = async (id: string) => {
  const deleted = await Category.findByIdAndDelete(id);
  if (!deleted) throw new Error('Category not found');
  return deleted;
};
