//credits: Thomas Fankhauser

module.exports.TestRequest = (method, url, body) => {
  const stream = new Readable();
  stream.method = method;
  stream.url = url;
  if (body) {
    stream.push(body);
    stream.push(null);
  }
  return stream;
};

module.exports.TestResponse = () => {
  this.ended = false;
  this.body = '';
  this.headers = {};
  this.statusCode = 0;
  this.writeHead = function(status, headers) {
    this.statusCode = status;
    this.headers = headers;
  };
  this.end = function(body) {
    this.body += body;
    this.ended = true;
    if (this.subscribers.finish) {
      this.subscribers.finish();
    }
  };
  this.subscribers = {};
  this.on = function(event, f) {
    this.subscribers[event] = f;
  };
};
