const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('./database/database');

const UserRoutes = require('./routes/routes');
const UserSecureRoutes = require('./routes/secure-routes');

app.use('/', express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Expose-Headers', '*');
    next();
});

app.use('/user', UserRoutes);
app.use('/secure', UserSecureRoutes);

const PORT = 3030;
app.listen(PORT, () => { console.log(`app listening on port: ${PORT}`) });
