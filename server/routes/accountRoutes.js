const express = require('express');
const router = express.Router();
const User = require('../models/User');
const utils = require('../utils');
const jwt = require('jsonwebtoken');

const generateToken = user => {
  return jwt.sign({
    _id: user._id,
    email: user.email,
    created: user.created,
  }, 'musicplayer', { expiresIn: '24h' });
};

router.post('/register', (req, res) => {

  if(utils.isEmptyObject(req.body)) {
    return res.status(400).end();
  }

  const {
    email,
    password
  } = req.body;

  let valid = email !== '' && email != null
              password !== '' && password != null;

  if(valid) {

    User.create({
      email: email,
      password: password,
    }, (err, user) => {
      if(err || user == null) {
        if(err.code === 11000) {
          return res.json({
            error: `User with email ${email} already exists`,
          });
        }

        return res.json({
          error: err ? err : 'Failed to create user',
        });

      } else {

        let token = generateToken(user);

        return res.json({
          success: true,
          token: token,
        });
      }

    });

  } else {
    return res.status(200).json({
      error: 'Invalid request',
    });
  }

});

router.post('/login', (req, res) => {
  if(utils.isEmptyObject(req.body)) {
    return res.status(400).end();
  }

  const {
    email,
    password
  } = req.body;

  let valid = email !== '' && email != null
              password !== '' && password != null;

  if(valid) {

    User.findOne({
      email: email,
      password: password,
    }, (err, user) => {
      if(err || user == null) {
        return res.json({
          error: err ? err : `No user with ${email} found`,
        });
      } else {

        let token = generateToken(user);

        return res.json({
          success: true,
          token: token,
        });
      }

    });


  } else {
    return res.json({
      error: 'Invalid request',
    });
  }
});

module.exports = router;
