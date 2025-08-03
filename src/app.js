const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler'); 
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/v1', routes);

//error handler
app.use(errorHandler);

module.exports = app;
