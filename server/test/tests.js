const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();
chai.use(chaiHttp);
const User = require('../models/User');
const Playlist = require('../models/Playlist');

let testUser = {
  email: 'backend-test@test.com',
  password: 'test',
};

let testPlaylist = {
  name: 'Backend-test-playlist',
};

User.remove({ email: testUser.email }, (err, user) => {
  if(err) {
    console.log('Failed to remove testUser from the db');
  }
});

Playlist.remove({ name: testPlaylist.name }, (err, playlist) => {
  if(err) {
    console.log('Failed to remove testPlaylist from the db');
  }
});

describe('Tests for the accounting routes', () => {

  describe('All tests for the /register routes', () => {
    let route = '/account/register';

    it('Request with empty request body should return statusCode 400', done => {
      chai.request(app).post(route).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('Request with email (null) and password (null) parameter should return statusCode 400', done => {
      chai.request(app).post(route).send({
        'email': null,
        'password': null,
      }).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('Request with empty email and password parameter should return statusCode 400', done => {
      chai.request(app).post(route).send({
        'email': '',
        'password': '',
      }).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('request with valid user data should return statusCode 200', done => {
      chai.request(app).post(route).send({
        'email': testUser.email,
        'password': testUser.password,
      }).end((err, res) => {
        res.should.have.status(200);
        testUser = res.body.user;
        done();
      });
    });

  });

  describe('All tests for the /login routes', () => {
    let route = '/account/login';

    it('Request with empty request body should return statusCode 400', done => {
      chai.request(app).post(route).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('Request with email (null) and password (null) parameter should return statusCode 400', done => {
      chai.request(app).post(route).send({
        'email': null,
        'password': null,
      }).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('Request with empty email and password parameter should return statusCode 400', done => {
      chai.request(app).post(route).send({
        'email': '',
        'password': '',
      }).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('Request with valid data of a registered user should return statusCode 200', done => {
      chai.request(app).post(route).send({
        'email': testUser.email,
        'password': testUser.password,
      }).end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

  });

  describe('All tests for the /verfiyToken route', () => {
    let route = '/account/verifyToken';

    it('Request with empty request body should return statusCode 400', done => {
      chai.request(app).post(route).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('Request with token (null) should return statusCode 401', done => {
      chai.request(app).post(route).send({
        'token': null,
      }).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('Request with token (undefined) should return statusCode 401', done => {
      chai.request(app).post(route).send({
        'token': undefined,
      }).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

  });

});

describe('Tests for the /playlists routes', () => {

  describe('All tests for the /playlists route', () => {
    let route = '/playlists';

    it('GET-Request to this route should return a list of all playlists', done => {
      chai.request(app).get(route).end((err, res) => {
        res.body.should.be.a('array');
        done();
      });
    });

    it('DELETE-Request without a specified playlistId (id) in the body should return statusCode 400', done => {
      chai.request(app).delete(route).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('POST-Request without a request body should return statusCode 400', done => {
      chai.request(app).post(route).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    it('POST-Request with valid data should return statusCode 200', done => {
      chai.request(app).post(route).send({
        name: testPlaylist.name,
        id: testUser._id,
      }).end((err, res) => {
        res.should.have.status(200);
        testPlaylist = res.body.playlist;
        done();
      });

    });

    it('DELETE-Request with a valid playlist id should return statusCode 200', done => {
      chai.request(app).delete(route).send({
        'id': testPlaylist._id,
      }).end((err, res) => {
        res.should.have.status(200);
        done();
      })
    });

  });

  describe('All tests for the /playlists/:id route', () => {

    it('POST-Request without a request body should return statusCode 400', done => {
      let route = '/playlists/' + testPlaylist._id;
      chai.request(app).post(route).end((err, res) => {
        res.should.have.status(400);
        done();
      })
    });

    it('DELETE-Request without a request body should return statusCode 400', done => {
      let route = '/playlists/' + testPlaylist._id;
      chai.request(app).delete(route).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });

    // it('DELETE-Request with a valid playlist id should return statusCode 200', done => {
    //   chai.request(app).delete(route).send({
    //     'id': testPlaylist._id,
    //   }).end((err, res) => {
    //     res.should.have.status(200);
    //     done();
    //   })
    // });

  });

});
