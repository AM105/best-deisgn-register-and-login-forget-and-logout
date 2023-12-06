const User=require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register=async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const login=async(req,res)=>{
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        res.json({ token });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    
}

const Verify = async (req, res) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.json({ userId: decoded.userId, message: 'Token is valid' });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  

  const ForgetPassword=async(req,res)=>{
    try {
        const { email, oldPassword, newPassword } = req.body;
    
        // Find the user by email
        const user = await User.findOne({ email });
    
        // Check if the user exists
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Check if the old password is correct
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid old password' });
        }
    
        // Hash the new password before updating
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
    
        // Save the updated user to the database
        await user.save();
    
        // Optionally, you can generate a new JWT token here and send it back in the response
    
        res.status(200).json({ message: 'Password changed successfully' });
      } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}




  module.exports={register,login,Verify,ForgetPassword}