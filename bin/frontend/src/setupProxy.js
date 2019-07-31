const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/redAgro', { target: 'http://localhost:8080' }));
};