const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

require('./database/database');
const APIRoutes = require('./routes/api');

app.use('/', express.static(__dirname + '/dist'));
app.get('*', (req, res) => {
    res.redirect('/');
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Expose-Headers', '*');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', APIRoutes);

const httpServer = http.createServer(app);
httpServer.listen(8082, () => {
    console.log('HTTP Server running on port 80');
});

const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/scrawlless.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/scrawlless.com/fullchain.pem'),
}, app);
httpsServer.listen(8002, () => {
    console.log('HTTPS Server running on port 443');
});
