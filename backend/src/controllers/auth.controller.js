import { registerUser, loginUser } from '../services/auth.service.js';
import { sendSuccess } from '../utils/ApiResponse.js';
import { toUserDTO } from '../dto/auth.dto.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerUser(name, email, password);
    sendSuccess(res, { user: toUserDTO(user), token }, 201);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    sendSuccess(res, { user: toUserDTO(user), token });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    sendSuccess(res, { user: toUserDTO(req.user) });
  } catch (err) {
    next(err);
  }
};