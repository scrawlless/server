const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use('/', express.static(__dirname + '/dist'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Expose-Headers', '*');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const httpServer = http.createServer();
httpServer.listen(4000, () => {
    console.log('HTTP Server running on port 4000');
});