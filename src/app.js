const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler'); 

const app = express();
app.use(express.json());

// routes
app.use('/api/v1', routes);

//error handler
app.use(errorHandler);

module.exports = app;
