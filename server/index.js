const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || '3214';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/item/:id', express.static(`${__dirname}/../public`));

const mpTarget = 'http://3.23.171.227';
const mpProxy = { target: mpTarget, changeOrigin: true }
app.use('*/mp/api', createProxyMiddleware(mpProxy));

const srTarget = 'http://50.18.135.245';
const srProxy = { target: srTarget, changeOrigin: true }
app.use('*/sr/api', createProxyMiddleware(srProxy));

const sbTarget = 'http://15.164.155.96';
const sbProxy = { target: sbTarget, changeOrigin: true }
app.use('*/sb/api', createProxyMiddleware(sbProxy));

const slnTarget = 'http://50.18.3.201';
const slnProxy = { target: slnTarget, changeOrigin: true }
app.use('*/sln/api', createProxyMiddleware(slnProxy));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
