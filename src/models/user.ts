import { Schema, model, Document, ObjectId} from 'mongoose';
import bcrypt from "bcryptjs"


// 1. Define a TypeScript interface for the User document
export interface IUser extends Document {
  _id: ObjectId;
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
  matchPassword(enteredPassword: string): Promise<boolean>;
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

// hash password before saving
userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// 3. Create and export the model
const UserModel = model<IUser>('User', userSchema);
export default UserModel;
