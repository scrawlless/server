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

app.post('/api/test', function (req, res) {
    res.send({ message: `Greetings for ${req.body.name} page!` });
});

const httpServer = http.createServer(app);
httpServer.listen(8080, () => {
    console.log('HTTP Server running on port 8080');
});