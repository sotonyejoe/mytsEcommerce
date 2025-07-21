import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  parentCategory?: mongoose.Types.ObjectId; // Reference to another category
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String },
  parentCategory: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
}, {
  timestamps: true,
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
