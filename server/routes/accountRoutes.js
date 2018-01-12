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
    return res.status(400).json({
      error: 'No body specified',
    });
  }

  const {
    token,
  } = req.body;

  //console.log('Received token', token);

  if(!token || token === 'undefined') {
    return res.status(400).json({
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

        User.findOne({ '_id': user._id }).populate({
          path: 'playlists',
          populate: {
            path: 'tracks',
          },
        }).exec((err, user) => {
          if(err || user == null) {
            return res.status(501).json({
              error: err ? err : 'user not found',
            });
          } else {
            return res.status(200).json({
              success: true,
              token: token,
              user: user,
              playlists: user.playlists,
            });
          }
        });

      }
    });

  }
});

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
    return res.status(400).json({
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

    let query = User.findOne({
      email: email,
      password: password,
    }).populate("playlists");

    query.exec((err, user) => {
      if(err || user == null) {
        return res.json({
          error: err ? err : `No user with ${email} found`,
        });
      } else {

        let token = generateToken(user);

        return res.json({
          success: true,
          token: token,
          playlists: user.playlists,
        });
      }

    });


  } else {
    return res.status(400).json({
      error: 'Invalid request',
    });
  }
});

module.exports = router;
