import User from '../models/User.js';
import { AppError } from '../utils/errors.js';

export const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }
  const user = await User.create({ name, email, password });
  const token = user.getSignedJwtToken(); // Need to add this method to model
  return { user, token };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }
  const token = user.getSignedJwtToken();
  return { user, token };
};