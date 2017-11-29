const User = require('../models/User');

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

module.exports.dispatch = (req, res) => {
  console.log('New API Call: URL', req.url);

  //POST = /register
  if(req.method === 'POST' && req.url === '/register') {
    console.log('Register');

    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const data = JSON.parse(body);

      const {
        email,
        password
      } = data;

      let valid = email !== '' && email != null
                  password !== '' && password != null;

      if(valid) {

        User.create({
          email: email,
          password: password,
        }, (err, user) => {
          if(err || user == null) {
            res.writeHead(400, headers);
            res.end(JSON.stringify({
              error: err ? err : 'user == null',
            }));
          } else {
            res.writeHead(200, headers);
            res.end(JSON.stringify({
              success: true,
            }));
          }

        });

      } else {
        res.writeHead(400, headers);
        res.end(JSON.stringify({
          error: 'Invalid request',
        }));
      }

    });
    return;
  }

};
