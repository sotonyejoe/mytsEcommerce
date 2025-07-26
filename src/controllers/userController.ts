// src/controllers/userController.ts
import { Request, Response } from 'express';
import {
  createUserService,
  getUserService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
} from '../services/userService';
import UserModel from '../models/user';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    // Check if user with the same email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email already exists. Please use another email.' });
      return;
    }

    // Create user if email is unique
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsersService();

    // Remove sensitive data like password
    const sanitizedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      isOnline: user.isOnline,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    res.status(200).json(sanitizedUsers);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to retrieve users.' });
  }
};


export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getUserService(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await updateUserService(id, req.body);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await deleteUserService(id);

    if (!result) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};;
