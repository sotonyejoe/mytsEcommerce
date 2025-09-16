import crypto from 'crypto';
import jwt from "jsonwebtoken";

const generateToken = (id: string): string => {
  return jwt.sign({id}, process.env.JWT_SECRET as string, {
    expiresIn: "30d"
  });
}
export const generateResetToken = (): {
  resetToken: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
} => {
  // 1. Generate a random token (this is what you'll send to the user)
  const resetToken = crypto.randomBytes(20).toString('hex');

  // 2. Hash the token (store this hash in the database for security)
  const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // 3. Set token expiration time (e.g., 1 hour from now)
  const resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  return {
    resetToken,
    resetPasswordToken,
    resetPasswordExpire,
  };
};
 

export default generateToken