const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Hardcode demo admin & driver
const DEMO_USERS = [
  { email: 'admin@nha.vn', password: '123456', role: 'admin', fullName: 'Admin Demo' },
  { email: 'driver@nha.vn', password: '123456', role: 'driver', fullName: 'Driver Demo' }
];

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // Check demo users first
  const demo = DEMO_USERS.find(u => u.email === email && u.password === password);
  if (demo) {
    const token = jwt.sign({ email: demo.email, role: demo.role, fullName: demo.fullName }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
    return res.json({ token, role: demo.role, fullName: demo.fullName });
  }
  // Check real employees
  const user = await Employee.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role, fullName: user.fullName }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
  res.json({ token, role: user.role, fullName: user.fullName });
};
