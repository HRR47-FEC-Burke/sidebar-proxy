const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const URL = process.env.URL || 'http://localhost';
const PORT = process.env.PORT || '3214';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/item/:id', express.static(`${__dirname}/../public`));

const mpScriptUrl = process.env.MP_URL || 'http://localhost:3001/bundle.js';
const mpTarget = process.env.MP_TARGET || 'http://localhost:3001';
const mpProxy = { target: mpTarget, changeOrigin: true }
app.use('*/mp/api', createProxyMiddleware(mpProxy));

const srScriptUrl = process.env.SR_URL || 'http://localhost:2625/dist/bundle.js';
const srTarget = process.env.SR_TARGET || 'http://localhost:2625';
const srProxy = { target: srTarget, changeOrigin: true }
app.use('*/sr/api', createProxyMiddleware(srProxy));

const sbScriptUrl = process.env.SB_URL || 'http://localhost:3210/bundle.js';
const sbTarget = process.env.SB_TARGET || 'http://localhost:3210';
const sbProxy = { target: sbTarget, changeOrigin: true }
app.use('*/sb/api', createProxyMiddleware(sbProxy));

const slnScriptUrl = process.env.SLN_URL || 'http://localhost:3005/similar-listings-news.bundle.js';
const slnTarget = process.env.SLN_TARGET || 'http://localhost:3005';
const slnProxy = { target: slnTarget, changeOrigin: true }
app.use('*/sln/api', createProxyMiddleware(slnProxy));

app.listen(PORT, () => {
  console.log(`listening on port ${URL}:${PORT}`);
});
