const express = require('express');
const router = express.Router();
const User = require('../models/User');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const jwtSecret = 'musicplayer';

const generateToken = user => {
  return jwt.sign({
    _id: user._id,
    email: user.email,
    created: user.created,
  }, jwtSecret, { expiresIn: '24h' });
};

//
router.post('/verifyToken', (req, res) => {
  if(utils.isEmptyObject(req.body)) {
    return res.status(401).json({
      error: 'No body specified',
    });
  }

  const {
    token,
  } = req.body;

  console.log('Received token', token);

  if(!token || token === 'undefined') {
    return res.status(401).json({
      error: 'Pass token',
    });
  } else {

    jwt.verify(token, jwtSecret, (err, user) => {
      if(err) {
        console.log('Verify err', err);
        return res.status(401).json({
          error: err,
        });
      } else {
        return res.status(200).json({
          success: true,
          token: token,
          user: user,
        });
      }
    });

  }
});

router.post('/register', (req, res) => {
  console.log('Req body', req.body);

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

router.post('/verfiyToken', (req, res) => {
  return res.json({
    success: true,
  });
});

module.exports = router;
