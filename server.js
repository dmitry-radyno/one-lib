var http = require('http');
var express = require('express');
var app = express();
var data = [
    {id: 1, name: "Item 1"},
    {id: 2, name: "Item 2"}
];

app.use(require('morgan')('short'));

(function initWebpack() {
  var webpack = require('webpack');
  var webpackConfig = require('./webpack/dev.config');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.use(express.static(__dirname + '/'));
})();

app.get('/', function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/data', function (req, res) {
  res.send(JSON.stringify(data));
});

if (require.main === module) {
  var server = http.createServer(app);
  server.listen(process.env.PORT || 3000, function onListen() {
    var address = server.address();
    console.log('Listening on: %j', address);
    console.log(' -> that probably means: http://localhost:%d', address.port);
  });
}
