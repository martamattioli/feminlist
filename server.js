const routes = require('./config/routes');
// const mongoose = require('mongoose');
const bluebird = require('bluebird');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

if (app.get('env') !== 'production') app.use(cors());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Running on port ${port}`));
