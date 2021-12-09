require('dotenv').config();
const express = require('express');
const PORT = 3000;
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const app = express();
const cors = require('cors');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestobd', {
  useNewUrlParser: true,
});

const options = {
  origin: [
    'http://localhost:3001',
    'http://malykhs.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

app.use('*', cors(options));
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log('Express is ok');
});
