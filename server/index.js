const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || '3214';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/item/:id', express.static(`${__dirname}/../public`));

const photoTarget = 'http://3.23.171.227';
const photoProxy = { target: photoTarget, changeOrigin: true }
app.use('*/photo/api', createProxyMiddleware(photoProxy));

const reviewsTarget = 'http://50.18.135.245';
const reviewsProxy = { target: reviewsTarget, changeOrigin: true }
app.use('*/reviews/api', createProxyMiddleware(reviewsProxy));

const sbTarget = 'http://15.164.155.96';
const sbProxy = { target: sbTarget, changeOrigin: true }
app.use('*/sb/api', createProxyMiddleware(sbProxy));

const slnTarget = 'http://50.18.3.201';
const slnProxy = { target: slnTarget, changeOrigin: true }
app.use('*/sln/api', createProxyMiddleware(slnProxy));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
