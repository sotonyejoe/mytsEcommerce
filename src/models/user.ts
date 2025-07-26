import { Schema, model, Document } from 'mongoose';

// 1. Define a TypeScript interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'subadmin';
  isOnline: boolean;
  lastSeen: Date;
  address: string;
  phone: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the Mongoose schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       trim: true,
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'subadmin'],
      default: 'user'
    },
    address: {
      type: String,
    },
    phone: {
      type: String
    },
      isOnline: {
    type: Boolean,
    default: false,
  },
  lastSeen: {
    type: Date,
  },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true // Automatically creates `createdAt` and `updatedAt`
  }
);

// 3. Create and export the model
const UserModel = model<IUser>('User', userSchema);
export default UserModel;
