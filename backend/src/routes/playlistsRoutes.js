const express = require('express');
const router = express.Router();
const Track = require('../models/Track');
const Playlist = require('../models/Playlist');
const User = require('../models/User');
const utils = require('../utils');

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

//deletes a playlist
router.delete('/', (req, res) => {
  if(utils.isEmptyObject(req.body)) {
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
  if(utils.isEmptyObject(req.body)) {
    return res.status(400).json({
      error: 'No body specified',
    });
  } else {

    //console.log('User id', req.body.id);
    //console.log('Name', req.body.name);
    //console.log('Req body', req.body);

    User.findOne({ '_id': req.body.id }, (err, user) => {
      if(err || user == null) {
        return res.status(400).json({
          error: err ? err : 'user not found',
        });
      } else {

        Playlist.create({
          name: req.body.name,
        }, (err, playlist) => {
          if(err) {
            return res.status(501).json({
              error: err,
            });
          } else {

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

router.post('/:id', (req, res) => {
  if(utils.isEmptyObject(req.body)) {
    return res.status(400).json({
      error: 'No body specified',
    });
  } else {

    //console.log('Playlist id', req.params.id);
    // console.log('Origin', req.body.origin);
    // console.log('Title', req.body.title);
    // console.log('Artists', req.body.artists);
    // console.log('source', req.body.source);

    var track = new Track({
      source: req.body.source,
      title: req.body.title,
      artists: req.body.artists,
      origin: req.body.origin,
    });

    track.save(err => {
      if(err) {

        return res.status(501).json({
          error: err,
        });
      } else {
        Playlist.findOneAndUpdate({
          '_id': req.params.id,
        }, {
          $push: {
            'tracks': track._id,
          },
        }, {
          new: true,
        }).exec((err, playlist) => {
          if(err || playlist == null) {

            return res.status(501).json({
              error: err ? err : 'playlist not found',
            });
          } else {
            return res.json({
              success: true,
              playlist: playlist,
              track: track,
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

//deletes a track from the playlist
router.delete('/:id', (req, res) => {

  if(utils.isEmptyObject(req.body)) {
    return res.status(400).json({
      error: 'No body specified',
    });
  }

  //console.log('Playlist id:', req.params.id);
  //console.log('Track id:', req.body.trackId);

  Playlist.findByIdAndUpdate(req.params.id, {
    $pull: {
      'tracks': req.body.trackId,
    },
  }, {
    new: true,
  }).populate("tracks").exec((err, playlist) => {
    if(err) {
      return res.status(501).json({
        error: err,
      });
    } else {

      Track.remove({
        '_id': req.body.trackId,
      }, (err, track) => {
        if(err) {
          return res.status(501).json({
            error: err,
          });
        } else {

          return res.json({
            success: true,
            playlist: playlist,
          })
        }
      });
    }
  });
});

module.exports = router;
