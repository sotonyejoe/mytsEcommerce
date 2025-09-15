import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import UserModel from '../models/user';
import sendEmail  from '../utils/sendEmail';
import  {generateResetToken}  from '../utils/tokenGenerator';
import ActivityModel from '../models/activity';
import jwt from 'jsonwebtoken';

interface RegisterAdminInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const registerAdminService = async (data: RegisterAdminInput) => {
  const { name, email, password } = data;

  const existing = await UserModel.findOne({ email });
  if (existing) {
    throw new Error('User already exists with this email');
  }

  // ✅ Count how many admins already exist
  const totalAdmins = await UserModel.countDocuments({ role: { $in: ['admin', 'subadmin'] } });

  if (totalAdmins >= 3) {
    throw new Error('Admin limit reached. Maximum of 3 admins allowed.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const role = totalAdmins === 0 ? 'admin' : 'subadmin'; // ✅ First is 'admin', rest are 'subadmin'

  const newAdmin = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return {
    id: newAdmin._id,
    email: newAdmin.email,
    role: newAdmin.role,
  };
};

export const getAdminsService = async () => {
  return await UserModel.find({ role: { $in: ['admin', 'subadmin'] } });
};

export const getSubadminLogs = async () => {
  return await ActivityModel.find()
    .populate('userId', 'name email role')
    .sort({ timestamp: -1 });
};

export async function forgotPassword(email: string, protocol: string, host: string) {
  // 1. Find user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('No user found with this email');
  }

  // 2. Generate reset tokens and expiry
  const { resetToken, resetPasswordToken, resetPasswordExpire } = generateResetToken();

  // 3. Save hashed token and expiry on user document
  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpire = resetPasswordExpire;

  await user.save();

  // 4. Create password reset URL to send to user
  const resetUrl = `${protocol}://${host}/api/auth/reset-password/${resetToken}`;

  // 5. Compose email message
  const message = `You requested a password reset. Please click the link below or paste it into your browser to reset your password:\n\n${resetUrl}`;

  try {
    // 6. Send the email
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: message,
    });
  } catch (error) {
    // 7. On error, remove token fields and save user
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    throw new Error('Failed to send email');
  }
}


export async function resetPassword(resetToken: string, newPassword: string) {
  // Optional: Hash token if stored hashed
  // const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Find user by reset token and check expiry
  const user = await UserModel.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  // Update password and clear reset token fields
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return true;
}


export const loginUserService = async (data: LoginInput) => {
  const { email, password } = data;

  // Find user and include password
  const user = await UserModel.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Set isOnline to true
  user.isOnline = true;
  await user.save();

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

export { generateResetToken };

