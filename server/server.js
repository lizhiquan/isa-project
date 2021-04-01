const config = require('./config');
const express = require('express');
const cors = require('cors');
const { ValidationError } = require('express-validation');
const { UnauthorizedError } = require('express-jwt');

const app = express();

const corsOptions = config.corsDomain && {
  origin: config.corsDomain,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', require('./routes'));

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  if (err instanceof UnauthorizedError) {
    return res.status(err.status).json(err);
  }

  console.error(err);
  return res.status(500).json(err);
});

const server = app.listen(config.port, function () {
  console.log('Listening on port ' + server.address().port);
});
