const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// POST signup
router.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already exists. <a href='/signup'>Try again</a>");
    }

    const newUser = new User({ name, email, password, phone });
    await newUser.save();

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.send("Something went wrong. <a href='/signup'>Try again</a>");
  }
});

module.exports = router;
