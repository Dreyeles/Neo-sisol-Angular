const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const DIST_PATH = path.resolve(__dirname, 'frontend/dist/frontend/browser');

// Proxy /api AND /uploads by mounting on root level with filters
// This prevents stripping of the /api prefix
app.use(createProxyMiddleware({
    pathFilter: ['/api', '/uploads'],
    target: 'http://localhost:5000',
    changeOrigin: true,
    logLevel: 'debug'
}));

app.use(express.static(DIST_PATH));

app.use((req, res) => {
    res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.listen(4200, '0.0.0.0', () => {
    console.log('🚀 Unified Server (Fixed Path Mapping) on http://localhost:4200');
});
