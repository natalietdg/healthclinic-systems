const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');
var cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(cors());

app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.use('/api', createProxyMiddleware({
    target: `http://localhost:8080/`,
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['access-control-allow-origin'] = '*';
    }
}));

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});