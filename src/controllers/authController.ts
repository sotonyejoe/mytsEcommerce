import { Request, Response } from 'express';
import { registerAdminService, getAdminsService, generateResetToken,  loginUserService } from '../services/authService'; // import service functions
// Removed duplicate or unused imports
import * as authService from '../services/authService';
import { forgotPassword } from '../services/authService';

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await registerAdminService(req.body);
    res.status(201).json({ message: 'Admin registered', admin });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await getAdminsService();
    res.status(200).json({ count: admins.length, admins });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



export async function handleForgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const protocol = req.protocol;
    const host = req.get('host')!;

    await forgotPassword(email, protocol, host);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
export async function resetPassword(req: Request, res: Response) {
  const { token } = req.params;
  const { password } = req.body;

  try {
    await authService.resetPassword(token, password);
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Password reset failed' });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = await loginUserService(req.body);
    res.status(200).json(userData);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};