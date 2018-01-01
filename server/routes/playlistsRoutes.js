const express = require('express');
const router = express.Router();
const Track = require('../models/Track');
const Playlist = require('../models/Playlist');
const User = require('../models/User');

//actually not needed, get all playlists
router.get('/', (req, res) => {
  Playlist.find({}, (err, playlists) => {
    if(err) {
      return res.status(501).json(err);
    } else {
      return res.json(playlists);
    }
  });
});

//deletes are playlist
router.delete('/', (req, res) => {
  if(!req.body) {
    return res.status(400).json({
      error: 'No body specified',
    });
  } else {

    Playlist.findOneAndRemove({
      '_id': req.body.id,
    }, (err, playlist) => {
      if(err || playlist == null) {
        return res.status(501).json({
          error: err ? err : 'playlist not found',
        });
      } else {
        return res.json({
          success: true,
          playlist: playlist,
        });
      }
    });
  }
});

//creates a new playlist
router.post('/', (req, res) => {
  if(!req.body) {
    return res.status(400).json({
      error: 'No body specified',
    });
  } else {
    console.log('User id', req.body.id);
    console.log('Name', req.body.name);

    User.findOne({ '_id': req.body.id }, (err, user) => {
      if(err || user == null) {
        return res.status(400).json({
          error: err ? err : 'user not found',
        });
      } else {

        var playlist = new Playlist({
          name: req.body.name,
        });

        playlist.save(err => {
          if(err) {
            return res.status(501).json({
              error: err,
            });
          } else {

            console.log('Id of new created playlist', playlist._id);

            User.findOneAndUpdate({
              '_id': req.body.id,
            }, {
              $push: {
                'playlists': playlist._id,
              },
            }, {
              new: true,
            }, (err, user) => {
              if(err || user == null) {
                return res.status(501).json({
                  error: err,
                });
              } else {
                return res.json({
                  success: true,
                  playlist: playlist,
                });
              }
            });

          }
        });
      }
    });
  }
});

//adds a track to a playlist
router.put('/:id', (req, res) => {
  return res.json({
    success: true,
  });
});

module.exports = router;
