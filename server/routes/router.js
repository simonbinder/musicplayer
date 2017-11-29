
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

module.exports.dispatch = (req, res) => {
  console.log('New API Call: URL', req.url);

  //POST = /register
  if(req.method === 'POST' && req.url === '/register') {
    console.log('Register');
    return;
  }

};
