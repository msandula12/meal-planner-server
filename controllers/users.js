import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export const signIn = async (req, res) => {
  const { password, email } = req.body;
  console.log('req.body: ', req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist.' });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const signUp = async (req, res) => {
  const { confirmPassword, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        message: 'Must enter a valid email address.',
      });
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords must match.' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    return res.status(200).json({ result: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};
