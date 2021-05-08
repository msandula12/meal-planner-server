import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signIn = async (req, res) => {
  const { password, username } = req.body;
  try {
    const existingUser = await User.findOne({ username });
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
      { username: existingUser.username, id: existingUser._id },
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
  const { confirmPassword, password, username } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    console.log('existingUser: ', existingUser);
    if (existingUser) {
      console.log('USER EXISTS');
      return res.status(400).json({ message: 'User already exists.' });
    }
    if (password !== confirmPassword) {
      console.log('PASSWORDS MUST MATCH');
      return res.status(400).json({ message: 'Passwords must match.' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      password: hashedPassword,
      username,
    });
    const token = jwt.sign(
      { username: newUser.username, id: newUser._id },
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
