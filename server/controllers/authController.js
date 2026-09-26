import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import createNotification from '../utils/createNotification.js';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

export const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  
  const userExists = await User.findOne({ email });
  if (userExists) return sendError(res, 'User already exists', 400);

  const user = await User.create({ name, email, password, phone });
  
  await createNotification({
    user: user._id,
    title: 'Welcome to AutoMate!',
    message: 'Your account has been successfully created. Explore our vehicles today.',
    type: 'general',
    sendMail: true
  });

  const token = generateToken(user._id);
  sendSuccess(res, 'Registration successful', { user: { _id: user._id, name: user.name, email: user.email, role: user.role }, token }, 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return sendError(res, 'Invalid email or password', 401);
  }

  if (user.isBlocked) {
    return sendError(res, 'Your account has been blocked', 403);
  }

  const token = generateToken(user._id);
  sendSuccess(res, 'Login successful', { user: { _id: user._id, name: user.name, email: user.email, role: user.role }, token });
};

export const logout = (req, res) => {
  sendSuccess(res, 'Logged out successfully');
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return sendError(res, 'User not found', 404);

  const resetToken = user.generatePasswordReset();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const message = `You are receiving this email because you requested a password reset. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({ email: user.email, subject: 'Password Reset Token', message });
    sendSuccess(res, 'Email sent');
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return sendError(res, 'Email could not be sent', 500);
  }
};

export const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) return sendError(res, 'Invalid or expired token', 400);

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  sendSuccess(res, 'Password updated successfully');
};
