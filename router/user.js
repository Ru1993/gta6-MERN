import express from 'express';
import User from '../model/schema.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, lastName } = req.body;

    if (!email || !lastName) {
      res.status(400).json({ message: 'Please fill in the required fields' });
    }

    const userRegister = await User.findOne({ email });

    if (userRegister) {
      res
        .status(400)
        .json({ message: 'A user with the same email already exists' });
    }

    const user = await User.create({ email, lastName });

    if (user) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        lastName: user.lastName,
      });
    } else {
      return res.status(400).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    res.status(500).json({ message: `Something went wrong ${error.message}` });
  }
});

export default router;
